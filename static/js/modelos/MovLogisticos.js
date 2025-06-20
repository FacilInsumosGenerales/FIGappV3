// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { lugar_direccion } from "./Lugares.js";
import { estadosMovLog } from "../data/estados_data.js";
import { empresa_nombre } from "./Empresas.js";




export const tablaMadreMovLogisticos = {
    nombre: "movimientos_logisticos",
    fechaGuia: 'Fecha_planeada',
    alias: 'mLog'
};

const movLogistico_lugarInicial = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "lugarInicial",
    nombreEnBD: "Lugar_inicial",
    nombreUI: "Lugar Inicial",
    tipo: 'int',
    formato: lugar_direccion
});

const movLogistico_lugarFinal = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "lugarFinal",
    nombreEnBD: "Lugar_final",
    nombreUI: "Lugar Final",
    tipo: 'int',
    formato: lugar_direccion
});

const movLogistico_peso = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "peso",
    nombreEnBD: "Peso_kg",
    nombreUI: "Peso (kg)",
    tipo: 'decimal'
});

const movLogistico_volumen = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "volumen",
    nombreEnBD: "Volumen_m3",
    nombreUI: "Volumen (m³)",
    tipo: 'decimal'
});

const movLogistico_paletizado = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "paletizado",
    nombreEnBD: "Paletizado",
    nombreUI: "Paletizado",
    tipo: 'boolean'
});

const movLogistico_fechaPlaneada = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "fechaPlaneada",
    nombreEnBD: "Fecha_planeada",
    nombreUI: "Fecha Planeada",
    tipo: 'datetime'
});

const movLogistico_fechaReal = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "fechaReal",
    nombreEnBD: "Fecha_real",
    nombreUI: "Fecha Real",
    tipo: 'datetime'
});

const movLogistico_transportista = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "transportista",
    nombreEnBD: "Transportista",
    nombreUI: "Transportista",
    tipo: 'TRAZA',
    formato: empresa_nombre
});

const movLogistico_folderImagenes = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "folderImagenes",
    nombreEnBD: "Folder_imagenes",
    nombreUI: "Folder de Imágenes",
    tipo: 'varchar'
});

const movLogistico_estado = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "estado",
    nombreEnBD: "Estado",
    nombreUI: "Estado",
    tipo: 'int',
    formato: estadosMovLog,
});

// este nombre no es correcto
export const movLogistico_comprobantes = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "comprobantes",
    nombreEnBD: "Movimiento_bancario",
    nombreUI: "Comprobante de pago",
    tipo: 'int'
});

const movLogistico_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const movLogistico_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreMovLogisticos,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const movLogistico_columnasTodas = [
    movLogistico_lugarInicial,
    movLogistico_lugarFinal,
    movLogistico_peso,
    movLogistico_volumen,
    movLogistico_paletizado,
    movLogistico_fechaPlaneada,
    movLogistico_fechaReal,
    movLogistico_transportista,
    movLogistico_folderImagenes,
    movLogistico_estado,
    movLogistico_comprobantes,
    movLogistico_ediciones,
    movLogistico_traza
];
