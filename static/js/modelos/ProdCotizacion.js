// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { cotizacion_numero } from "./Cotizaciones.js";
import { prodOferta_descripcionCliente } from "./ProdOfertas.js";


export const tablaMadreProdCotizacion = {
    nombre: "productos_cotizacion",
    alias: 'pCot'
};

export const prodCotizacion_cotizacionProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreProdCotizacion,
    nombre: "cotizacionProveedor",
    nombreEnBD: "Cotizacion_Proveedor",
    nombreUI: "Cotización del Proveedor",
    tipo: 'TRAZA',
    formato: prodOferta_descripcionCliente
});

export const prodCotizacion_cotizacionCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdCotizacion,
    nombre: "cotizacionCliente",
    nombreEnBD: "Cotizacion_Cliente",
    nombreUI: "Cotización del Cliente",
    tipo: 'TRAZA',
    formato: cotizacion_numero
});

const prodCotizacion_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdCotizacion,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const prodCotizacion_columnasTodas = [
    prodCotizacion_cotizacionProveedor,
    prodCotizacion_cotizacionCliente,
    prodCotizacion_traza
];
