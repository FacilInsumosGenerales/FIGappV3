// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { ocCliente_numeroOCCliente } from "./OCCliente.js";
import { prodOferta_descripcionCliente } from "./ProdOfertas.js";


export const tablaMadreProdOcCliente = {
    nombre: "productos_en_OC_cliente",
    fechaGuia: 'Fecha_entrega_maxima',
    alias: 'pOCl'
};

export const prodOcCliente_productoCotizado = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "productoCotizado",
    nombreEnBD: "Producto_cotizado",
    nombreUI: "Producto Cotizado",
    tipo: 'TRAZA',
    formato: prodOferta_descripcionCliente
});

export const prodOcCliente_ocCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "ocCliente",
    nombreEnBD: "OC_cliente",
    nombreUI: "Número de OC Cliente",
    tipo: 'TRAZA',
    formato: ocCliente_numeroOCCliente
});

export const prodOcCliente_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'decimal'
});

export const prodOcCliente_fechaEntregaMaxima = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "fechaEntregaMaxima",
    nombreEnBD: "Fecha_entrega_maxima",
    nombreUI: "Fecha de Entrega Máxima",
    tipo: 'datetime'
});

const prodOcCliente_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const prodOcCliente_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcCliente,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const prodOcCliente_columnasTodas = [
    prodOcCliente_productoCotizado,
    prodOcCliente_ocCliente,
    prodOcCliente_cantidad,
    prodOcCliente_fechaEntregaMaxima,
    prodOcCliente_ediciones,
    prodOcCliente_traza
];
