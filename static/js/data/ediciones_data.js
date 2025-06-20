import { prepTabulator } from "../utils/tabulator_utils.js";

// Tablas
export const tblHistorialOptions = prepTabulator([
    { title: "mensaje" , field: 'mensaje', formatter: "textarea", visible: false },
    { title: "nombreTabla" , field: 'nombreTabla', visible:false },
    { title: "TRAZA" , field: 'TRAZA' },
    { title: "elemento" , field: 'elemento', visible:false },
    { title: "Ultimo Mensaje" , field: 'MensajeLateralIzquierdo', formatter: "html" },
],false,1,"nombreTabla"); 

// "nombre de la tabla": "nombre de la columna que contiene el titulo del elemento"
export const mapaTitulosPorTabla={
    "bd_cotizaciones_de_proveedores":"Descripcion_cliente",
    "contactos":"Nombre",
    "empresas":"Nombre",
    "cotizaciones_proveedores":"TRAZA",
    "comprobantes_de_pago":"Numero_de_documento",
    "lugares":"Nombre_de_lugar",
    "movimientos_bancarios":"Concepto",
    "detracciones":"Concepto",
    "notas":"Descripcion",
    "datos_generales_de_cotizaciones":"Numero_de_Cotizacion",
    "datos_generales_del_proceso": "Cod_Req",
    "datos_generales_ocs_clientes" :"Numero_OC_Cliente",
    "datos_generales_orden_compra_a_proveedores":"No_Orden_de_Compra",
    "planilla":"Producto_Solicitado",
    "productos_en_OC_cliente":"TRAZA",
    "productos_en_oc_proveedor":"TRAZA",
    "reclamos":"Descripcion reclamo",
    "productos_en_logistica":"TRAZA",
    "movimientos_logisticos":"Fecha_planeada",
    "guias_emitidas":"Numero_Guia",

};

export class JSONEdicion {

    constructor(dataEdicion) {
        this.nombreTabla = dataEdicion.nombreTabla; 
        this.trazaElemento = dataEdicion.trazaElemento;
        this.edicion = dataEdicion.edicion;
    }

    // Método para generar la estructura de datos repetitiva
    _generarEstructura() {
        return {
            "nombreTabla": this.nombreTabla,
            "datosFiltro": [
                {
                    "tabla": this.nombreTabla,
                    "columna": "TRAZA",
                    "operacion": "=",
                    "comparador": this.trazaElemento,
                    "siguienteOperacion": null
                }
            ]
        };
    }

    // Propiedad para obtener la data con 'edicion'
    get guardarData() {
        const estructuraBase = this._generarEstructura();
        estructuraBase["informacionColumnas"] = {
            "Ediciones": this.edicion
        };
        return estructuraBase;
    }

    // Propiedad para obtener la data sin 'edicion'
    get obtenerData() {
        const estructuraBase = this._generarEstructura();
        estructuraBase["nombreTabla"] = `\`${this.nombreTabla}\``;  
        estructuraBase["datosFiltro"][0]["tabla"] = `\`${this.nombreTabla}\``;  

        estructuraBase["informacionColumnas"] = {
            "Ediciones": null
        };
        return estructuraBase;
    }
}

export const flechaArriba = `<svg class="icon icon-tabler icon-tabler-caret-up-filled" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" stroke-width="0" fill="currentColor"></path>
</svg>`;
export const flechaAbajo = `<svg class="icon icon-tabler icon-tabler-caret-down-filled" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" stroke-width="0" fill="currentColor"></path>
</svg>`;