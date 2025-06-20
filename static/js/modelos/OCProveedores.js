import { Columna } from "../componentes/Columna.js";
import { estadosOCProveedores, Monedas } from "../data/estados_data.js";
import { contacto_apellido, contacto_empresa, contacto_nombre } from "./Contactos.js";
import { lugar_nombre } from "./Lugares.js";

export const tablaMadreOcProveedores = {
    nombre:"datos_generales_orden_compra_a_proveedores",
    fechaGuia:"Fecha_actualizacion",
    alias: 'ocPr'
};

export const ocProveedor_noOrdenCompra = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "noOrdenCompra",
    nombreEnBD: "No_Orden_de_Compra",
    nombreUI: "N° Orden de Compra",
    tipo: 'text'
});

export const ocProveedor_proveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "proveedor",
    nombreEnBD: "Proveedor",
    nombreUI: "Empresa: contacto",
    tipo: 'TRAZA',
    formato: [contacto_empresa,": ", contacto_nombre, " ", contacto_apellido]
});

const ocProveedor_estado = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "estado",
    nombreEnBD: "Estado",
    nombreUI: "Estado",
    tipo: 'int',
    formato: estadosOCProveedores
});

const ocProveedor_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

const ocProveedor_valorCompra = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "valorCompra",
    nombreEnBD: "Valor_de_compra",
    nombreUI: "Valor de Compra",
    tipo: 'decimal'
});

const ocProveedor_igv = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "igv",
    nombreEnBD: "IGV",
    nombreUI: "IGV",
    tipo: 'decimal'
});

const ocProveedor_lugarEntrega = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "lugarEntrega",
    nombreEnBD: "Lugar_de_entrega",
    nombreUI: "Lugar de Entrega",
    tipo: 'TRAZA',
    formato: lugar_nombre
});

const ocProveedor_garantia = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "garantia",
    nombreEnBD: "Garantia",
    nombreUI: "Garantía",
    tipo: 'text'
});

const ocProveedor_ocPDF = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "ocPDF",
    nombreEnBD: "OC_pdf",
    nombreUI: "OC (PDF)",
    tipo: 'file'
});

const ocProveedor_ocEntregada = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "fechaEntrega",
    nombreEnBD: "OC_entregada",
    nombreUI: "OC entregada ",
    tipo: 'boolean'
});

const ocProveedor_observaciones = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "observaciones",
    nombreEnBD: "Observaciones",
    nombreUI: "Observaciones",
    tipo: 'text'
});

const ocProveedor_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Ediciones",
    tipo: 'text'
});

const ocProveedor_fechaActualizacion = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "fechaActualizacion",
    nombreEnBD: "Fecha_actualizacion",
    nombreUI: "Fecha de Actualización",
    tipo: 'datetime',
    obligatorio: true
});

export const ocProveedor_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreOcProveedores,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const ocProveedor_columnasTodas = [
    ocProveedor_noOrdenCompra,
    ocProveedor_proveedor,
    ocProveedor_estado,
    ocProveedor_moneda,
    ocProveedor_valorCompra,
    ocProveedor_igv,
    ocProveedor_lugarEntrega,
    ocProveedor_garantia,
    ocProveedor_ocPDF,
    ocProveedor_ocEntregada,
    ocProveedor_observaciones,
    ocProveedor_ediciones,
    ocProveedor_fechaActualizacion,
    ocProveedor_traza
];
