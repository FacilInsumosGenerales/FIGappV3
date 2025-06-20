import { Columna } from "../componentes/Columna.js";
import { categoriaComprobantePago, Monedas, tipoComprobantePago } from "../data/estados_data.js";
import { empresa_nombre } from "./Empresas.js";
import { ocCliente_numeroOCCliente } from "./OCCliente.js";
import { ocProveedor_noOrdenCompra } from "./OCProveedores.js";

export const tablaMadreComprobante = {
    nombre:"comprobantes_de_pago",
    fechaGuia:"Fecha_Emision",
    alias: "comp"
}

const comprobante_Tipo = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "tipo",
    nombreEnBD: "Tipo",
    nombreUI: "Tipo de comprobante",
    tipo: 'int',
    formato: tipoComprobantePago
});

const comprobante_Categoria = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "categoria",
    nombreEnBD: "Categoria",
    nombreUI: "Categoria",
    tipo: 'int',
    formato: categoriaComprobantePago
});

export const comprobante_Proveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "proveedor",
    nombreEnBD: "Proveedor",
    nombreUI: "Proveedor",
    tipo: 'TRAZA',
    formato : empresa_nombre,
});
export const comprobante_OCCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "ocCliente",
    nombreEnBD: "OC_cliente",
    nombreUI: "OC cliente TRAZA",
    tipo: 'TRAZA',
    formato: ocCliente_numeroOCCliente,
});
const comprobante_ocProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "ocProveedor",
    nombreEnBD: "OC_proveedor",
    nombreUI: "OC proveedor TRAZA",
    tipo: 'TRAZA',
    formato: ocProveedor_noOrdenCompra,
});
const comprobante_descripcion = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "descripcion",
    nombreEnBD: "Descripcion",
    nombreUI: "Descripcion",
    tipo: 'text'
});
export const comprobante_numeroDocumento = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "numeroDocumento",
    nombreEnBD: "Numero_de_documento",
    nombreUI: "Numero de documento",
    tipo: 'text'
});
const comprobante_fechaEmision = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "fechaEmision",
    nombreEnBD: "Fecha_Emision",
    nombreUI: "Fecha de emisión",
    tipo: 'datetime',
    obligatorio: true
});
const comprobante_fechaVencimiento = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "fechaVencimiento",
    nombreEnBD: "Fecha_Vencimiento",
    nombreUI: "Fecha de vencimiento",
    tipo: 'datetime'
});
const comprobante_fechaEnvio = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "fechaEnvio",
    nombreEnBD: "Fecha_de_Envio",
    nombreUI: "Fecha de envío",
    tipo: 'datetime'
});

const comprobante_valorSinIGV = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "valorSinIGV",
    nombreEnBD: "Valor_sin_IGV",
    nombreUI: "Valor sin IGV",
    tipo: 'decimal'
});

export const comprobante_saldo = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "saldo",
    nombreEnBD: "Saldo",
    nombreUI: "Saldo",
    tipo: 'decimal'
});

const comprobante_igv = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "igv",
    nombreEnBD: "IGV",
    nombreUI: "IGV",
    tipo: 'decimal'
});

const comprobante_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'text',
    formato: Monedas
});

const comprobante_pdf = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "pdf",
    nombreEnBD: "Documento_PDF",
    nombreUI: "PDF",
    tipo: 'file'
});

const comprobante_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Ediciones",
    tipo: 'text'
});

export const comprobante_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreComprobante,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});
	
export const comprobante_columnasTodas = [
    comprobante_Tipo,
    comprobante_Categoria,
    comprobante_Proveedor,
    comprobante_OCCliente,
    comprobante_ocProveedor,
    comprobante_descripcion,
    comprobante_numeroDocumento,
    comprobante_fechaEmision,
    comprobante_fechaVencimiento,
    comprobante_fechaEnvio,
    comprobante_valorSinIGV,
    comprobante_saldo,
    comprobante_igv,
    comprobante_moneda,
    comprobante_pdf,
    comprobante_ediciones,
    comprobante_traza
];