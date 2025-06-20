// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { ocProveedor_noOrdenCompra } from "./OCProveedores.js";
import { prodOferta_descripcionProveedor } from "./ProdOfertas.js";


export const tablaMadreProdOcProv = {
    nombre: "productos_en_oc_proveedor",
    fechaGuia: 'Fecha_entrega_maxima',
    alias: 'pOPr'
};

export const prodOcProv_productoCotizado = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "productoCotizado",
    nombreEnBD: "Producto_cotizado",
    nombreUI: "Producto Cotizado",
    tipo: 'TRAZA',
    formato: prodOferta_descripcionProveedor
});

export const prodOcProv_ocProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "ocProveedor",
    nombreEnBD: "OC_proveedor",
    nombreUI: "OC Proveedor",
    tipo: 'TRAZA',
    formato: ocProveedor_noOrdenCompra,
});

export const prodOcProv_productoOcCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "productoOcCliente",
    nombreEnBD: "Producto_OC_Cliente",
    nombreUI: "Producto OC Cliente",
    tipo: 'int'
});

const prodOcProv_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'decimal'
});

const prodOcProv_stock = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "stock",
    nombreEnBD: "Stock",
    nombreUI: "Stock Disponible",
    tipo: 'boolean'
});

const prodOcProv_fechaEntregaMaxima = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "fechaEntregaMaxima",
    nombreEnBD: "Fecha_entrega_maxima",
    nombreUI: "Fecha de Entrega Máxima",
    tipo: 'datetime'
});

const prodOcProv_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const prodOcProv_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOcProv,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const prodOcProv_columnasTodas = [
    prodOcProv_productoCotizado,
    prodOcProv_ocProveedor,
    prodOcProv_productoOcCliente,
    prodOcProv_cantidad,
    prodOcProv_stock,
    prodOcProv_fechaEntregaMaxima,
    prodOcProv_ediciones,
    prodOcProv_traza
];
