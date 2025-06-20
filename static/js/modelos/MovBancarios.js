// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadreMovimientosBancarios = {
    nombre: "movimientos_bancarios",
    fechaGuia: 'Fecha',
    alias: 'mBan'
};

const movimiento_tipo = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "tipo",
    nombreEnBD: "Tipo",
    nombreUI: "Tipo de Movimiento",
    tipo: 'varchar'
});

const movimiento_fecha = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "fecha",
    nombreEnBD: "Fecha",
    nombreUI: "Fecha",
    tipo: 'datetime'
});

const movimiento_valor = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "valor",
    nombreEnBD: "Valor",
    nombreUI: "Valor",
    tipo: 'decimal'
});

const movimiento_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar'
});

const movimiento_concepto = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "concepto",
    nombreEnBD: "Concepto",
    nombreUI: "Concepto",
    tipo: 'varchar'
});

const movimiento_archivo = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "archivo",
    nombreEnBD: "Archivo",
    nombreUI: "Archivo",
    tipo: 'varchar'
});

const movimiento_noOperacionBancaria = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "noOperacionBancaria",
    nombreEnBD: "No_Operacion_Bancaria",
    nombreUI: "Número de Operación Bancaria",
    tipo: 'varchar'
});

const movimiento_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const movimiento_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreMovimientosBancarios,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const movimiento_columnasTodas = [
    movimiento_tipo,
    movimiento_fecha,
    movimiento_valor,
    movimiento_moneda,
    movimiento_concepto,
    movimiento_archivo,
    movimiento_noOperacionBancaria,
    movimiento_ediciones,
    movimiento_traza
];
