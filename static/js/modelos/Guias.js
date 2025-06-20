import { Columna } from "../componentes/Columna.js";
import { ocCliente_numeroOCCliente } from "./OCCliente.js";

export const tablaMadreGuias = {
    nombre:"guias_emitidas",
    fechaGuia: "Fecha_Emision",
    alias: 'guia'
}

export const guias_OCClienteTRAZA = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombre: "OCClienteTRAZA",
    nombreEnBD: "OC_de_cliente",
    nombreUI: "TRAZA OC de cliente",
    tipo: "TRAZA",
    formato: ocCliente_numeroOCCliente
});

const guias_numeroGuia = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombreEnBD: "Numero_Guia",
    nombre: "numeroGuia", 
    nombreUI: "Número de guía",
    tipo:"text"
});

const guias_pdfSinFirma = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombreEnBD: "Guia_sin_firma_PDF",
    nombre: "pdfSinFirma", 
    nombreUI: "Guía sin firma",
    tipo: "file"
});

const guias_pdfConFirma = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombreEnBD: "Guia_firmada_PDF",
    nombre: "pdfConFirma", 
    nombreUI: "Guía con firma",
    tipo: 'file',
  
});

const guias_fechaEmicion = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombreEnBD: "Fecha_Emision",
    nombre: "fechaEmicion", 
    nombreUI: "Fecha de emisión",
    tipo: 'date',
    obligatorio: true
});

const guias_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreGuias,
    nombreEnBD: "Ediciones",
    nombre: "ediciones", 
    nombreUI: "Ediciones",
    tipo: "text"
});

export const guias_columnasTodas = [
    guias_OCClienteTRAZA,
    guias_numeroGuia,
    guias_pdfSinFirma,
    guias_pdfConFirma,
    guias_fechaEmicion,
    guias_ediciones
];