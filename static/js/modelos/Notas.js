import { Columna } from "../componentes/Columna.js";
import {  Monedas, tipoNotas } from "../data/estados_data.js";
import { comprobante_numeroDocumento } from "./Comprobante.js";

export const tablaMadreNotas = {
    nombre:"notas",
    fechaGuia:"Fecha_Emision",
    alias: 'nota'
};

const nota_tipo = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "tipo",
    nombreEnBD: "Tipo",
    nombreUI: "Tipo",
    tipo: 'int',
    formato: tipoNotas
});

const nota_descripcion = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "descripcion",
    nombreEnBD: "Descripcion",
    nombreUI: "Descripción",
    tipo: 'varchar'
});

const nota_comprobanteOrigen = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "comprobanteOrigenTraza",
    nombreEnBD: "Comprobante_de_origen",
    nombreUI: "Comprobante de Origen TRAZA",
    tipo: 'TRAZA',
    formato: comprobante_numeroDocumento
});

const nota_comprobanteDestino = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "comprobanteDestinoTraza",
    nombreEnBD: "Comprobante_de_destino",
    nombreUI: "Comprobante de DestinoTRAZA",
    tipo: 'TRAZA',
    formato: comprobante_numeroDocumento

});

const nota_numeroNCredito = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "numeroNCredito",
    nombreEnBD: "Numero_NCredito",
    nombreUI: "Número de Nota de Crédito",
    tipo: 'varchar'
});

const nota_fechaEmision = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "fechaEmision",
    nombreEnBD: "Fecha_Emision",
    nombreUI: "Fecha de Emisión",
    tipo: 'datetime',
    obligatorio: true
});

const nota_fechaVencimiento = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "fechaVencimiento",
    nombreEnBD: "Fecha_Vencimiento",
    nombreUI: "Fecha de Vencimiento",
    tipo: 'datetime'
});

const nota_fechaCancelacion = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "fechaCancelacion",
    nombreEnBD: "Fecha_Cancelacion",
    nombreUI: "Fecha de Cancelación",
    tipo: 'datetime'
});

const nota_formaDePago = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "formaDePago",
    nombreEnBD: "Forma_de_Pago",
    nombreUI: "Forma de Pago",
    tipo: 'varchar'
});

const nota_valor = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "valor",
    nombreEnBD: "Valor",
    nombreUI: "Valor",
    tipo: 'decimal'
});

const nota_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

const nota_notaCreditoPDF = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "notaCreditoPDF",
    nombreEnBD: "Nota_Credito_PDF",
    nombreUI: "Nota de Crédito (PDF)",
    tipo: 'file'
});

const nota_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Ediciones",
    tipo: 'text'
});

const nota_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreNotas,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const notas_columnasTodas = [
    nota_tipo,
    nota_descripcion,
    nota_comprobanteOrigen,
    nota_comprobanteDestino,
    nota_numeroNCredito,
    nota_fechaEmision,
    nota_fechaVencimiento,
    nota_fechaCancelacion,
    nota_formaDePago,
    nota_valor,
    nota_moneda,
    nota_notaCreditoPDF,
    nota_ediciones,
    nota_traza
];