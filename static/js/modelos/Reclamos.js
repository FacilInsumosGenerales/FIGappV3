// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadreReclamos = {
    nombre: "reclamos",
    fechaGuia: 'Fecha de Reclamo',
    alias: 'recl'
};

const reclamo_producto = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "producto",
    nombreEnBD: "Producto",
    nombreUI: "Producto",
    tipo: 'int'
});

const reclamo_descripcionReclamo = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "descripcionReclamo",
    nombreEnBD: "Descripcion_reclamo",
    nombreUI: "Descripción del Reclamo",
    tipo: 'text'
});

const reclamo_archivoReclamo = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "archivoReclamo",
    nombreEnBD: "Archivo_reclamo",
    nombreUI: "Archivo del Reclamo",
    tipo: 'varchar'
});

const reclamo_fechaReclamo = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "fechaReclamo",
    nombreEnBD: "Fecha_reclamo",
    nombreUI: "Fecha del Reclamo",
    tipo: 'datetime'
});

const reclamo_descripcionResolucion = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "descripcionResolucion",
    nombreEnBD: "Descripcion_resolucion",
    nombreUI: "Descripción de la Resolución",
    tipo: 'text'
});

const reclamo_archivoResolucion = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "archivoResolucion",
    nombreEnBD: "Archivo_resolucion",
    nombreUI: "Archivo de la Resolución",
    tipo: 'varchar'
});

const reclamo_fechaResolucion = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "fechaResolucion",
    nombreEnBD: "Fecha_resolucion",
    nombreUI: "Fecha de Resolución",
    tipo: 'datetime'
});

const reclamo_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const reclamo_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreReclamos,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const reclamo_columnasTodas = [
    reclamo_producto,
    reclamo_descripcionReclamo,
    reclamo_archivoReclamo,
    reclamo_fechaReclamo,
    reclamo_descripcionResolucion,
    reclamo_archivoResolucion,
    reclamo_fechaResolucion,
    reclamo_ediciones,
    reclamo_traza
];
