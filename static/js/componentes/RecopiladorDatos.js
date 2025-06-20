import { formatoFechaYYYYMMDD } from "../utils/date_utils.js";
import { cargarReferencias } from "../utils/referencias_utils.js";
import { Columna } from "./Columna.js";

export class RecopiladorDatos {
    constructor(columnas, tablaOrigen, conectores = {}, detallesJSON = {}, recopiladorConfig = {}) {

        verificarConstructor(columnas, tablaOrigen, conectores);
        // todo: verificar que todas las tablas tengan aliases
        
        this.columnas = columnas;
        this.tablaOrigen = tablaOrigen;
        this.detallesJSON = detallesJSON;
        this._conectarse(conectores);


        this.datosNuevos = recopiladorConfig?.datosNuevos?? false;
        this.procedimientoAlmacenado= recopiladorConfig?.procedimientoAlmacenado?? null;

    }
    
    _conectarse(conectores) {
        if (!conectores) return;
    
        this._buscador = conectores.buscador ?? null;

        this._tablaDependencia = conectores.tablaMadre ?? null;
        if (this._tablaDependencia) {
            this._columnaQueDepende = this._tablaDependencia.columnaLocal;
        }

        this._valoresSelect2 = conectores.valoresSelect2?? null
    }
    
    get columnaDependienteDeOtraTabla(){
        return this._columnaQueDepende?? null;
    }

    get nombreTablaOrigenCompleto(){
        return this.tablaOrigen.nombre;

    }
    
    get buscador(){
        return this._buscador;
    }

    get JSONget() {
        return {
            "nombreTabla": this._nombreTabla,
            "informacionColumnas": this._informacionColumnas,
            "datosFiltro": this._datosFiltro,
            ...this.detallesJSON,
        };
    }

    get _nombreTabla(){
        return `${this.tablaOrigen.nombre} AS ${this.tablaOrigen.alias}`;
    }

    get _informacionColumnas() {

        if (this._esMultiplesTablas) {
            return this._generarInformacionColumnasMultiplesTablas();
        }
    
        return { [`${this.tablaOrigen.alias}.*`]: null };
    }
    
    
    get _esMultiplesTablas() {
        const tablasUnicas = new Set(this.columnas
            .map(col => col.nombreTablaMadre)  
            .filter(nombre => nombre)         
        );
        return tablasUnicas.size > 1;  
    }
    
    _generarInformacionColumnasMultiplesTablas() {

        return this.columnas.reduce((info, col) => {
            if (!col.nombreTablaMadre) return info; // Ignorar columnas sin nombre de tabla madre
    
            let key = `${col.nombreTablaMadre}.${col.nombreEnBD} AS ${col.nombre}`;
    
            info[key] = null;
            return info;
        }, {});
    }
    
    
    
    get _datosFiltro() {

        if (this._buscador) {
            return this._generarFiltroBuscador();
        } else if (this._tablaDependencia) {
            return this._generarFiltroDependiendoDeOtraTabla();
        } else {
            return [];
        }
    
    }
    
    
    _generarFiltroBuscador(){
        const fechaInicio = this.buscador.fechaInicio;
        const fechaFin = this.buscador.fechaFin;
        const comparador = `'${formatoFechaYYYYMMDD(fechaInicio)} 00:00:00' AND '${formatoFechaYYYYMMDD(fechaFin)} 00:00:00'`;

        return [{
            "tabla": this.tablaOrigen.alias,
            "columna": this._fechaComparativaTabla,
            "operacion": "BETWEEN",
            "comparador": comparador,
            "siguienteOperacion": null
        }];
    }

    _generarFiltroDependiendoDeOtraTabla(){
        const { columnaLocal, tablaReferencia, columnaReferencia } = this._tablaDependencia;

        const setComparacion = tablaReferencia.obtenerValoresColumnasDeFilasSeleccionadas(columnaReferencia.nombre);
        const arrayComparacion = Array.from(setComparacion, String);
        let comparadorEnFormatoSQL = `('${arrayComparacion.join("','")}')`;

        return [{
            "tabla":columnaLocal.nombreTablaMadre,
            "columna": columnaLocal.nombreEnBD,
            "operacion": "IN",
            "comparador": comparadorEnFormatoSQL,
            "siguienteOperacion": null
        }]

    }

    get _fechaComparativaTabla(){
        return this.tablaOrigen.fechaGuia;
    }
    
    async obtenerDatosTabla() {
        await cargarReferencias(this.columnas);

        if (this.datosNuevos){
            return [];
        }
         
        const respuestaData = await this._obtenerDatos();

        if (!this._verificarDatosObtenidos(respuestaData)){
            return [];
        }
        else{
            let data = respuestaData.datos;
            const datosOriginales = this._cambiarNombreColumnas(data)
            return datosOriginales;
        };
    }

    async obtenerDatosInforme(){
        await cargarReferencias(this.columnas);

        if (this.datosNuevos){
            return this._devolverDatosVacios();
        }
        const respuestaData = await this._obtenerDatos();

        if (!this._verificarDatosObtenidos(respuestaData)){
            return this._devolverDatosVacios();
        }
        else{
            let data = respuestaData.datos;
            const datosOriginales = this._cambiarNombreColumnas(data)
            return datosOriginales[0];
        };

    }
    
    async _obtenerDatos(){

        let respuestaData;
        if (this.procedimientoAlmacenado){
            respuestaData =  await ejecutarSP(this.JSONget,this.procedimientoAlmacenado);
        }
        else {
            respuestaData = await obtenerData(this.tablaOrigen.nombre, this.columnas);  
        }
   
        return respuestaData
        
    }

    

    _devolverDatosVacios() {
        const columnasDeFiltro = this._obtenerColumnasDeFiltro();
        const columnasVacias = this._crearColumnasSemiVacias();
        return this._asignarValoresDeFiltro(columnasVacias, columnasDeFiltro);
    }
    
    _obtenerColumnasDeFiltro() {
        const columnasDeFiltro = {};
    
        if (!this.JSONget.datosFiltro || this.JSONget.datosFiltro.length === 0) return columnasDeFiltro;
    
        this.JSONget.datosFiltro.forEach(filtro => {
            const columnaConValor = this._buscarColumnaPorNombreEnBD(filtro.columna);
            if (!columnaConValor) return;
    
            const comparador = filtro.comparador;
            const valor = this._esListaString(comparador) 
                ? this._obtenerPrimerValorDeLista(comparador) 
                : comparador;
    
            columnasDeFiltro[columnaConValor.nombre] = valor;
        });
    
        return columnasDeFiltro;
    }
    

    _esListaString(comparador){
        return typeof comparador === 'string' && comparador.startsWith('(') && comparador.endsWith(')');
    }

    _obtenerPrimerValorDeLista(listaString) {

        const sinParentesis = listaString.slice(1, -1);
        const listaDividida = sinParentesis.split(',');
        const primerValor = listaDividida[0];
        
        return parseInt(primerValor.replace(/'/g, ''));
    }
    
    
    
    _buscarColumnaPorNombreEnBD(columnaNombreBD) {
        return this.columnas.find(columna => columna.nombreEnBD === columnaNombreBD);
    }
    
    _crearColumnasSemiVacias() {
        return Object.fromEntries(
            this.columnas.map(columna => [columna.nombre, columna.valorVacio])
        );
    }
    
    
    _asignarValoresDeFiltro(columnasVacias, columnasDeFiltro) {
        for (const columnaNombre in columnasDeFiltro) {
            if (columnasDeFiltro.hasOwnProperty(columnaNombre)) {
                columnasVacias[columnaNombre] = columnasDeFiltro[columnaNombre];
            }
        }
        return columnasVacias;
    }
    
    

    _verificarDatosObtenidos(respuestaData){
        if (!respuestaData ||  !respuestaData.datos || (respuestaData.datos.length == 0 )) {
            return false;
        }
        return true
    }


    _cambiarNombreColumnas(datosOriginales){

        const mapeoColumnas = this.columnas.reduce((map, col) => {
            map[col.nombreOriginal] = col.nombre;
            return map;
        }, {});


        return datosOriginales.map(item => {
            let nuevoObjeto = {};
            Object.keys(item).forEach(key => {
                const nuevoNombre = mapeoColumnas[key] || key; 
                nuevoObjeto[nuevoNombre] = item[key];
            });
            return nuevoObjeto;
        });
    }

    // Coneccion con tablas madres

    get tablaDeDependencia() {
        if (!this._tablaDependencia?.tablaReferencia) {
            return null;
        }
    
        const { tablaReferencia, dependiente } = this._tablaDependencia;    
        return { tablaReferencia, dependiente: dependiente ?? true };
    }
    
    
    

}





// FUnciones que pueden estar en otra pagina

function verificarConstructor(columnas, tablaOrigen, conectores){
    if (!Array.isArray(columnas)) {
        throw new Error("Las columnas deben ser un array.");
    }
    

    columnas.forEach((columna, index) => {
        if (!(columna instanceof Columna)) {
            throw new Error(`La columna en la posición ${index} no es una instancia válida de Columna.`);
        }
    });

    esEstructuraValida(conectores);

    if (conectores?.buscador) {
        if (!tablaOrigen || !("fechaGuia" in tablaOrigen)) {
            throw new Error("El objeto tablaOrigen debe contener el campo 'fechaGuia' cuando se usa un buscador.");
        }
    }
}

function esEstructuraValida(obj) {
    // Verificar si el objeto es plano (sin propiedades anidadas en el nivel raíz)
    for (const key in obj) {
        const value = obj[key];

        // Si es un objeto plano, permitir solo si está anidado bajo otra propiedad
        if (value && typeof value === 'object') {
            // Si detecta que es una instancia de clase (prohibido en el nivel raíz)
            if (value.constructor && value.constructor.name !== 'Object') {
                return false;  // No debe permitir `new Buscador` u otras instancias aquí
            }

            // Si está en el nivel raíz y es un objeto simple, verificar propiedades
            if (!esObjetoAnidado(value)) {
                return false;  // Permitir solo si las propiedades están anidadas
            }
        }
    }

    return true;  // Si pasa todas las validaciones, es una estructura válida
}

function esObjetoAnidado(obj) {
    // Comprobar si el objeto contiene propiedades y está anidado bajo otra clave 
    return Object.values(obj).some(value => value && typeof value === 'object');
}




export async function obtenerData(tablaNombre, columnas, filtros = {}) {

    try {


        const columnasNombres = columnas.map(columna => columna.nombreOriginal);
        const url = new URL('http://localhost:8000/api/obtener_datos/');
        url.searchParams.append('tabla_nombre', tablaNombre);
        columnasNombres.forEach(columna => {
            url.searchParams.append('columnas', columna);
        });
        // Agregar filtros si es necesario
        if (Object.keys(filtros).length > 0) {
            url.searchParams.append('filtros', JSON.stringify(filtros));
        }


        const response = await fetch(url);
        const data = await response.json();
        
        return data;  // Aquí obtendrás los datos
    } catch (error) {
        console.error('Error obteniendo datos:', error);
        return { error: 'Hubo un error al obtener los datos' };
    }
}
