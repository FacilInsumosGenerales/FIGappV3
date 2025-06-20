// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { estadosCotizaciones, Monedas } from "../data/estados_data.js";
import { datosGenerales_codReq } from "./DatosGenerales.js";

export const tablaMadreCotizaciones = {
    nombre: "datos_generales_de_cotizaciones",
    fechaGuia: 'Fecha',
    alias: 'coti'
};

export const cotizacion_codReq = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "codReq",
    nombreEnBD: "Cod_Req",
    nombreUI: "Codigo de Requerimiento",
    tipo: 'TRAZA',
    formato: datosGenerales_codReq,

});

export const cotizacion_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'text',
    formato: Monedas,
    obligatorio:true
});

export const cotizacion_numero = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "numeroCotizacion",
    nombreEnBD: "Numero_de_Cotizacion",
    nombreUI: "Número de Cotización",
    tipo: 'text'
});

const cotizacion_valorVenta = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "valorVenta",
    nombreEnBD: "Valor_de_venta",
    nombreUI: "Valor de Venta",
    tipo: 'decimal'
});

const cotizacion_igv = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "igv",
    nombreEnBD: "IGV",
    nombreUI: "IGV",
    tipo: 'decimal'
});

const cotizacion_fecha = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "fecha",
    nombreEnBD: "Fecha",
    nombreUI: "Fecha",
    tipo: 'datetime',
    obligatoria: true
});

const cotizacion_validez = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "validez",
    nombreEnBD: "Validez",
    nombreUI: "Validez (días)",
    tipo: 'int'
});

const cotizacion_enviada = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "enviada",
    nombreEnBD: "Enviada",
    nombreUI: "Fecha de Envío",
    tipo: 'datetime'
});

const cotizacion_archivo = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "archivo",
    nombreEnBD: "Archivo",
    nombreUI: "Archivo",
    tipo: 'file'
});

const cotizacion_adjuntos = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "adjuntos",
    nombreEnBD: "Adjuntos",
    nombreUI: "Adjuntos",
    tipo: 'file'
});

const cotizacion_observaciones = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "observaciones",
    nombreEnBD: "Observaciones",
    nombreUI: "Observaciones",
    tipo: 'text'
});

const cotizacion_estado = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "estado",
    nombreEnBD: "Estado",
    nombreUI: "Estado",
    tipo: 'int',
    formato: estadosCotizaciones,
    valorPredeterminado: 1
});

const cotizacion_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const cotizacion_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreCotizaciones,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const cotizacion_columnasTodas = [
    cotizacion_codReq,
    cotizacion_moneda,
    cotizacion_numero,
    cotizacion_valorVenta,
    cotizacion_igv,
    cotizacion_fecha,
    cotizacion_validez,
    cotizacion_enviada,
    cotizacion_archivo,
    cotizacion_adjuntos,
    cotizacion_observaciones,
    cotizacion_estado,
    cotizacion_ediciones,
    cotizacion_traza
];
