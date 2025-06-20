import { Columna } from "../componentes/Columna.js";
import { estadosReq, prioridadesReq } from "../data/estados_data.js";
import { contacto_identificacion } from "./Contactos.js";
import { lugar_direccion, lugar_nombre } from "./Lugares.js";


export const tablaMadreDatosGenerales = {
    nombre: "datos_generales_del_proceso",
    fechaGuia: 'Submission_Date',
    alias: 'daGe'
};

export const datosGenerales_codReq = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "codReq",
    nombreEnBD: "Cod_Req",
    nombreUI: "Codigo de Requerimiento",
    tipo: 'varchar'
});

export const datosGenerales_nombreProducto = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "nombreProducto",
    nombreEnBD: "Nombre_del_producto",
    nombreUI: "Nombre del Producto",
    tipo: 'text'
});


export const datosGenerales_prioridad = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "prioridad",
    nombreEnBD: "Prioridad",
    nombreUI: "Prioridad",
    tipo: 'varchar',
    formato: prioridadesReq,
    valorPredeterminado: 'Baja'
});

export const datosGenerales_contactoCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "contactoCliente",
    nombreEnBD: "Contacto_Cliente",
    nombreUI: "Contacto Cliente",
    tipo: 'TRAZA',
    formato: contacto_identificacion,
    obligatorio: true
});

export const datosGenerales_otrosCostosFactura = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "otrosCostosFactura",
    nombreEnBD: "Otros_Costos_con_factura",
    nombreUI: "Otros Costos con Factura",
    tipo: 'decimal'
});

const datosGenerales_costosSinFactura = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "costosSinFactura",
    nombreEnBD: "Costos_sin_factura",
    nombreUI: "Costos sin Factura",
    tipo: 'decimal'
});

export const datosGenerales_fechaRegistro = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "fechaRegistro",
    nombreEnBD: "Submission_Date",
    nombreUI: "Fecha de Registro",
    tipo: 'datetime',
    obligatorio: true
});

export const datosGenerales_estado = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "estado",
    nombreEnBD: "Estado",
    nombreUI: "Estado",
    tipo: 'varchar',
    formato: estadosReq,
    valorPredeterminado: 1
});

export const datosGenerales_lugarEntrega = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "lugarEntrega",
    nombreEnBD: "Lugar_de_entrega_al_cliente",
    nombreUI: "Lugar de Entrega al Cliente",
    tipo: 'TRAZA',
    formato: [lugar_nombre, ': ', lugar_direccion]
});

export const datosGenerales_adjuntos = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "adjuntos",
    nombreEnBD: "Adjuntos",
    nombreUI: "Adjuntos",
    tipo: 'file'
});

const datosGenerales_transporteEstimado = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "transporteEstimado",
    nombreEnBD: "Transporte_estimado_soles",
    nombreUI: "Transporte Estimado (S/.)",
    tipo: 'decimal'
});

const datosGenerales_gmPorcentaje = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "gmPorcentaje",
    nombreEnBD: "GM_porcentaje_deseado",
    nombreUI: "GM % Deseado",
    tipo: 'decimal'
});

const datosGenerales_productoEntregado = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "productoEntregado",
    nombreEnBD: "Producto_entregado",
    nombreUI: "Producto Entregado",
    tipo: 'boolean'
});

const datosGenerales_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const datosGenerales_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreDatosGenerales,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const datosGenerales_columnasTodas = [
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    datosGenerales_prioridad,
    datosGenerales_contactoCliente,
    datosGenerales_otrosCostosFactura,
    datosGenerales_costosSinFactura,
    datosGenerales_fechaRegistro,
    datosGenerales_estado,
    datosGenerales_lugarEntrega,
    datosGenerales_adjuntos,
    datosGenerales_transporteEstimado,
    datosGenerales_gmPorcentaje,
    datosGenerales_productoEntregado,
    datosGenerales_ediciones,
    datosGenerales_traza
];
