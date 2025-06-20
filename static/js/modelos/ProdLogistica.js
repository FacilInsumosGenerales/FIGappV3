// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { lugar_nombre } from "./Lugares.js";
import { ocCliente_numeroOCCliente } from "./OCCliente.js";


export const tablaMadreProdLogistica = {
    nombre: "productos_en_logistica",
    fechaGuia: 'Fecha_entrega_cliente',
    alias: 'pLog'
};

export const prodLogistica_ocCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "ocCliente",
    nombreEnBD: "OC_cliente",
    nombreUI: "OC Cliente",
    tipo: 'TRAZA',
    formato: ocCliente_numeroOCCliente
});

export const prodLogistica_producto = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "producto",
    nombreEnBD: "Producto",
    nombreUI: "Producto",
    tipo: 'TRAZA'
});

const prodLogistica_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'decimal'
});

const prodLogistica_destinoFinal = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "destinoFinal",
    nombreEnBD: "Destino_final",
    nombreUI: "Destino Final",
    tipo: 'TRAZA',
    formato: lugar_nombre
});

const prodLogistica_fechaEntregaCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "fechaEntregaCliente",
    nombreEnBD: "Fecha_entrega_cliente",
    nombreUI: "Fecha de Entrega al Cliente",
    tipo: 'datetime'
});

const prodLogistica_fechaEntregaProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "fechaEntregaProveedor",
    nombreEnBD: "Fecha_entrega_proveedor",
    nombreUI: "Fecha de Entrega del Proveedor",
    tipo: 'datetime'
});

const prodLogistica_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const prodLogistica_etiqueta = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "etiqueta",
    nombreEnBD: "Etiqueta",
    nombreUI: "Etiqueta",
    tipo: 'text'
});

export const prodLogistica_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdLogistica,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const prodLogistica_columnasTodas = [
    prodLogistica_ocCliente,
    prodLogistica_producto,
    prodLogistica_cantidad,
    prodLogistica_destinoFinal,
    prodLogistica_fechaEntregaCliente,
    prodLogistica_fechaEntregaProveedor,
    prodLogistica_ediciones,
    prodLogistica_etiqueta,
    prodLogistica_traza
];
