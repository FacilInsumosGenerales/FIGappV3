import { Columna } from "../componentes/Columna.js";
import { estadosOCClientes } from "../data/estados_data.js";
import { contacto_nombre } from "./Contactos.js";
import { cotizacion_numero } from "./Cotizaciones.js";
import { lugar_direccion } from "./Lugares.js";

export const tablaMadreOcClientes = {
    nombre:"datos_generales_ocs_clientes",
    fechaGuia:"Fecha_Emision",
    alias: 'ocCl'
};

export const ocCliente_numeroCotizacion = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "numeroCotizacionTraza",
    nombreEnBD: "Numero_de_Cotizacion",
    nombreUI: "Número de Cotización TRAZA",
    tipo: 'TRAZA',
    formato: cotizacion_numero,
});

const ocCliente_contactoCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "contactoClienteTraza",
    nombreEnBD: "Contacto_cliente",
    nombreUI: "Contacto Cliente",
    tipo: 'TRAZA',
    formato: contacto_nombre
});

export const ocCliente_lugarEntrega = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "lugarEntregaTraza",
    nombreEnBD: "Lugar_de_entrega_al_cliente",
    nombreUI: "Lugar de Entrega TRAZA",
    tipo: 'TRAZA',
    formato: lugar_direccion

});

export const ocCliente_numeroOCCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "numeroOCCliente",
    nombreEnBD: "Numero_OC_Cliente",
    nombreUI: "Número de OC Cliente",
    tipo: 'text'
});

export const ocCliente_estado = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "estado",
    nombreEnBD: "Estado",
    nombreUI: "Estado",
    tipo: 'int',
    formato: estadosOCClientes
});

export const ocCliente_valorSinIGV = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "valorSinIGV",
    nombreEnBD: "Valor_sin_IGV",
    nombreUI: "Valor sin IGV",
    tipo: 'decimal'
});

const ocCliente_igv = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "igv",
    nombreEnBD: "IGV",
    nombreUI: "IGV",
    tipo: 'decimal'
});

export const ocCliente_fechaEmision = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "fechaEmision",
    nombreEnBD: "Fecha_Emision",
    nombreUI: "Fecha de Emisión",
    tipo: 'datetime',
    obligatorio: true
});

const ocCliente_ocClientePDF = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "ocClientePDF",
    nombreEnBD: "OC_Cliente_PDF",
    nombreUI: "OC Cliente (PDF)",
    tipo: 'file'
});

export const ocCliente_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Ediciones",
    tipo: 'text'
});

export const ocCliente_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreOcClientes,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const ocCliente_columnasTodas = [
    ocCliente_numeroCotizacion,
    ocCliente_contactoCliente,
    ocCliente_lugarEntrega,
    ocCliente_numeroOCCliente,
    ocCliente_estado,
    ocCliente_valorSinIGV,
    ocCliente_igv,
    ocCliente_fechaEmision,
    ocCliente_ocClientePDF,
    ocCliente_ediciones,
    ocCliente_traza
];
