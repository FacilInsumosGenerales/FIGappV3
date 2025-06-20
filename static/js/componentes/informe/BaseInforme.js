import { datosGenerales_estado } from "../../modelos/DatosGenerales.js";
import { obtenerElementoPorId } from "../../utils/componentes_utils.js";
import { EntidadConColumnas } from "../EntidadConColumnas.js";
import { SuministradorDatos } from "../SuministradorDatos.js";


export class Informe extends EntidadConColumnas{
    
    constructor(recopilador, config) {

        super(recopilador);
        
        this._config = config;
        this.nombreTablaOrigenCompleto = recopilador.nombreTablaOrigenCompleto;
        this.cuerpoUI = this._construirCuerpo();
        this._filaEnEdicion = null;

        this._dataOriginal = null
        this._tablaConectada = null;


        this.modalID = config?.modalID ?? null ;
    }

    set tablaConectada(nuevaTabla){
        this._tablaConectada = nuevaTabla;
    }

    _construirCuerpo() {
        
        let divCuerpo = document.createElement("div");

        divCuerpo = this._agregarColumnas(divCuerpo);

        return divCuerpo;
    }

    _agregarColumnas(divCuerpo) {
        this.columnas.forEach(col => {
            const columnaHTML = col.crearHTML('vista', this.modalID); 
            if (columnaHTML) {  
                divCuerpo.appendChild(columnaHTML);
            }
        });

        return divCuerpo;
    }


    async renderizar(idCuerpo) {
        const cuerpo = obtenerElementoPorId(idCuerpo);
        cuerpo.replaceChildren(this.cuerpoUI);
        await this.actualizarData();
        
    }

    async vaciar(){
        this.recopilador.datosNuevos = true;
        await this.actualizarData();
        this.recopilador.datosNuevos = false;
    }

    async actualizarData(){
        const data = await this.recopilador.obtenerDatosInforme();
        this._dataOriginal = data;
        this.llenarColumnas(data);
    }

    llenarData(fila) { 
        this._filaEnEdicion  = fila.node;

        const data = fila.data;

        this._dataOriginal = data;
        this.llenarColumnas(data);
    }

    llenarColumnas(data) {
        this.columnas.forEach(col => {
            if (Object.prototype.hasOwnProperty.call(data, col.nombre)) {
                col.valor = data[col.nombre];
            }
        });
    }

    llenarColumnasNuevoValor(data) {
        this.columnas.forEach(col => {
            if (Object.prototype.hasOwnProperty.call(data, col.nombre)) {
                col._valor = data[col.nombre];
            }
        });
    }

    get dataColumnas() {
        const data = {};
        this.columnas.forEach(col => {
            if (col.valor !== undefined) {
                data[col.nombre] = col.valor;
            }
        });
        return data;
    }
    
    

    async _guardarData() {
        const columnasAGuardar = this.columnas.filter(col => this._mismaTablaMadre(col));
        const { cambioExitoso, tipo, traza } = await SuministradorDatos.guardarData(columnasAGuardar, this._idBotones);
    
        if (!cambioExitoso) return;
    
        await this._accionesDespuesDeGuardar({ columnasAGuardar, tipo, traza });
         
    }
    
    async _accionesDespuesDeGuardar({ columnasAGuardar, tipo, traza }) {
        // Por defecto no hace nada.
    }
    

    _mismaTablaMadre(columna) {
        return columna.nombreTablaMadreCompleto === this.nombreTablaOrigenCompleto;
    }

    cambiarEstadoReq(estado, redirectUrl){
        const nombreColumnaEstado = datosGenerales_estado.nombre;
        this.llenarColumnasNuevoValor({ [nombreColumnaEstado]: estado });
        this._guardarData();

        window.location.href = redirectUrl;
    }
    
}

