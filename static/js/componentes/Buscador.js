import { obtenerElementoPorId } from "../utils/componentes_utils.js";
import { formatoFechaYYYYMMDD, obtenerRangoDeFechas } from "../utils/date_utils.js";

export class Buscador {

    constructor(rango = -3) {
        this.tablasConectadas = [];

        const { fechaActual, fechaInicioRango } = obtenerRangoDeFechas(rango);
        this._fechaInicio = fechaInicioRango;
        this._fechaFin = fechaActual;
        this._busqueda = '';

        this.eventDispatcher = new EventTarget();

        this.fechaInicioContenedor = null;
        this.fechaFinContenedor = null;
        this.busquedaContenedor = null;
    }


    renderizar() {
        this.busquedaContenedor = obtenerElementoPorId("input-search");
        this.fechaInicioContenedor = obtenerElementoPorId("input-fecha1");
        this.fechaFinContenedor = obtenerElementoPorId("input-fecha2");

        this.fechaInicioContenedor.value = formatoFechaYYYYMMDD(this._fechaInicio);
        this.fechaFinContenedor.value = formatoFechaYYYYMMDD(this._fechaFin);
        this.busquedaContenedor.value = this._busqueda;


        //Estas dos funciones se podrian abstraer para no repetir el codigo, pero se haria más dificil de leer
        this.fechaInicioContenedor.addEventListener("change", () => {
            if (!this.fechaInicioContenedor.value) {  
                this.fechaInicioContenedor.value = formatoFechaYYYYMMDD(this._fechaInicio);  
                return;
            }
            this.fechaInicio = this.fechaInicioContenedor.value;
        });
        
        this.fechaFinContenedor.addEventListener("change", () => {
            if (!this.fechaFinContenedor.value) { 
                this.fechaFinContenedor.value = formatoFechaYYYYMMDD(this._fechaFin);  
                return;
            }
            this.fechaFin = this.fechaFinContenedor.value;
        });
        

        this.busquedaContenedor.addEventListener("input", () => {
            this.busqueda = this.busquedaContenedor.value.toLowerCase();
        });

    }

    set fechaInicio(nuevaFecha) {
        this._asignarFecha("_fechaInicio", "fechaInicioContenedor", nuevaFecha);        
        this.emitirCambioFechas();
    }

    get fechaInicio() {
        return this._fechaInicio;
    }
    
    set fechaFin(nuevaFecha) {
        this._asignarFecha("_fechaFin", "fechaFinContenedor", nuevaFecha);        
        this.emitirCambioFechas();
    }

    get fechaFin() {
        return this._fechaFin;
    }

    set busqueda(nuevaBusqueda) {
        const valorInput = String(nuevaBusqueda);
        if (this.busquedaContenedor) {
            this.busquedaContenedor.value = valorInput;
        }
        this._busqueda = valorInput;
        this.emitirBusqueda();
    }
    

    get busqueda() {
        return this._busqueda;
    }

    _asignarFecha(propiedadFecha, contenedorFecha, fecha) {
    
        const nuevaFecha = new Date(fecha);

        if (!this._esFechaValida(nuevaFecha)) {
            return;
        }
    
        this[propiedadFecha] = nuevaFecha;
    
        if (this[contenedorFecha]) {
            this[contenedorFecha].value = formatoFechaYYYYMMDD(nuevaFecha);
        } 
    }
    
    
    _esFechaValida(fecha) {
        return !isNaN(fecha.getTime());
    }
    

    conectarTabla(nuevaTabla) {
        this.tablasConectadas.push(nuevaTabla);

        this.eventDispatcher.addEventListener("busqueda", (event) => {
            nuevaTabla.filtrarTabla(event.detail);
        });

        this.eventDispatcher.addEventListener("cambioFechas", () => {
            nuevaTabla.actualizarData();
        });
    }

    emitirBusqueda() {
        this.eventDispatcher.dispatchEvent(new CustomEvent("busqueda", { detail: this._busqueda }));
    }

    emitirCambioFechas() {
        this.eventDispatcher.dispatchEvent(new Event("cambioFechas"));
    }

}
