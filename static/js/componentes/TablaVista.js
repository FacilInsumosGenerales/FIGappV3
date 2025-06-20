import { obtenerElementoPorId } from "../utils/componentes_utils.js";
import { EntidadConColumnas } from "./EntidadConColumnas.js";


export class TablaVista extends EntidadConColumnas{
    constructor(recopiladorDatos , config = null) {

        super (recopiladorDatos);
        if (recopiladorDatos.buscador != null){
            recopiladorDatos.buscador.conectarTabla(this);
        }

       
        this.datosOriginales = [];
        this.datosFiltrados = [];
        this.criterioBusqueda = ""; 
        this.gridOpciones = null;
        this.gridApi = null;    
        this.config = config;  

    }


    _crearOpcionesGrid() {

        return {
            columnDefs: this._infoColumnas,
            rowData: this.datosOriginales,
            pagination: true,
            defaultColDef: {
                filter: true,
            },
            suppressCellFocus: true,
            ...this.config,
            ... this._contexto
        };
    }

    get _infoColumnas() {
        return this.columnas
        .map(columna => columna.formatoTabla)
        .filter(Boolean);
    }
    
    // Tiene que ser llamado despues de infoColumnas porque crear el formato tabla es lo que crea el contexto
    get _contexto() {
        let contexto = {};

        this.columnas.forEach(columna => {
            if (columna.contextoTabla) {
                contexto[columna.nombre] = columna.contextoTabla; // Corrección aquí
            }
        });
        return { context: contexto };
    }
    

    async renderizar(selector) {
        const contenedor = obtenerElementoPorId(selector);
        contenedor.innerHTML = ""; 
        contenedor.style.height = "400px";
        contenedor.style.width = "100%";

        await this._conseguirDatos();

        this.gridOpciones = this._crearOpcionesGrid();


        //Debugg
        window.gridConfigs = window.gridConfigs ?? {};
        window.gridConfigs[this.recopilador.tablaOrigen.nombre] = this.gridOpciones;


        this.gridApi = agGrid.createGrid(contenedor, this.gridOpciones);
    }

    async _conseguirDatos() {
        const datos = await this.recopilador.obtenerDatosTabla();
        this.datosOriginales = datos;
    }

    
    async actualizarData() {
        await this._conseguirDatos();
        this._aplicarFiltro(); 
    }

    actualizadFila(nodoFila, listaColumnas){

        listaColumnas.forEach(columna => {
            nodoFila.setDataValue(columna.nombreUnico, columna.valorConTipo);
        });

        this.gridApi.refreshCells({
            rowNodes: [nodoFila], 
            force: true 
        });
    }

   
    _aplicarFiltro() {
        if (!this._esQueryValido(this.criterioBusqueda)) {
            this.datosFiltrados = [...this.datosOriginales];
        } else {
            const queries = this._obtenerQueries(this.criterioBusqueda);
            this.datosFiltrados = this._filtrarDatos(queries);
        }
        this._actualizarTabla();
    }

    _actualizarTabla() {
        
        this.gridApi.setGridOption("rowData", this.datosFiltrados);
        
    }

    // Llamado desde buscador o elementos externos
    filtrarTabla(nuevoCriterio) {
        this.criterioBusqueda = nuevoCriterio.toLowerCase();
        this._aplicarFiltro();
    }

    _esQueryValido(query) {
        return query.trim().length > 0;
    }

    _obtenerQueries(query) {
        return query.toLowerCase().split(";").map(q => q.trim()).filter(q => q);
    }

    _filtrarDatos(queries) {
        return this.datosOriginales.filter(row => 
            queries.some(term =>
                Object.values(row).some(value => 
                    String(value).toLowerCase().includes(term)
                )
            )
        );
    }


    obtenerFilaSeleccionada() {
        return this.selectedRow;
    }

    obtenerValoresTodasFilas(nombreColumna){
        const valoresUnicos = new Set();  

        this.gridApi.forEachNode((node) => {
            valoresUnicos.add(node.data[nombreColumna]);  
        });

        return valoresUnicos;  

    }

    obtenerValoresColumnasDeFilasSeleccionadas(nombreColumna) {

        if (this.config.rowSelection) {
            const valoresUnicos = new Set();
    
            const nodosSeleccionados = this.gridApi.getSelectedNodes();
        
            nodosSeleccionados.forEach((node) => {
                valoresUnicos.add(node.data[nombreColumna]);  
            });
            return valoresUnicos;

        } else {
            return this.obtenerValoresTodasFilas(nombreColumna);
        }
    
    }

    // Codigo para actualizar tablas cuando estas cambian
    conectarTabla(nuevaEntidadConColumnas,dependiente) {

        nuevaEntidadConColumnas.dependeDeOtraTabla = true;

        if(dependiente){
            this.config = {
                onRowSelected: (event) => this.emitirCambioMadre(),
                rowSelection: {
                    mode: 'singleRow',
                    checkboxes: false,
                    enableClickSelection: true,
                },
                ... this.config,
            }
        }
        else{
            this.config = {
                onRowDataUpdated: (event) => this.emitirCambioMadre(),
                ... this.config,
            }
        }

        this.eventDispatcher.addEventListener("cambioMadre", () => {
            if (this.datosOriginales.length > 0){
                nuevaEntidadConColumnas.actualizarData();
            }
        });
    }

    emitirCambioMadre() {
        this.eventDispatcher.dispatchEvent(new Event("cambioMadre"));
    }

    
}
