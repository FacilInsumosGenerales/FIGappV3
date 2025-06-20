import { Columna } from "../componentes/Columna.js";
import { Monedas } from "../data/estados_data.js";
import { comprobante_numeroDocumento } from "./Comprobante.js";

export const tablaMadreDetracciones = {
    nombre:"detracciones",
    fechaGuia:'Fecha',
    alias: 'detr'
}

const detraccion_comprobante = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "comprobante",
    nombreEnBD: "Comprobante_de_pago",
    nombreUI: "Comprobante de Pago",
    tipo: 'TRAZA',
    formato: comprobante_numeroDocumento
});

const detraccion_fecha = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "fecha",
    nombreEnBD: "Fecha",
    nombreUI: "Fecha",
    tipo: 'datetime',
    obligatorio: true
});

const detraccion_valor = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "valor",
    nombreEnBD: "Valor",
    nombreUI: "Valor",
    tipo: 'decimal'
});

const detraccion_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

const detraccion_concepto = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "concepto",
    nombreEnBD: "Concepto",
    nombreUI: "Concepto",
    tipo: 'varchar'
});

const detraccion_archivo = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "archivo",
    nombreEnBD: "Archivo",
    nombreUI: "Archivo",
    tipo: 'file'
});

const detraccion_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Ediciones",
    tipo: 'text'
});

const detraccion_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreDetracciones,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const detraccion_columnasTodas = [
    detraccion_comprobante,
    detraccion_fecha,
    detraccion_valor,
    detraccion_moneda,
    detraccion_concepto,
    detraccion_archivo,
    detraccion_ediciones,
    detraccion_traza
];