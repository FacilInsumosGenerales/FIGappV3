// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { categorias, unidad_medidas } from "../data/estados_data.js";
import { datosGenerales_codReq } from "./DatosGenerales.js";


export const tablaMadrePlanilla = {
    nombre: "planilla",
    alias: "plan"
};

export const planilla_codReq = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "codReq",
    nombreEnBD: "Cod_Req",
    nombreUI: "Codigo de Requerimiento",
    tipo: 'TRAZA',
    formato: datosGenerales_codReq,
    obligatorio: true
});

export const planilla_grupo = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "grupo",
    nombreEnBD: "Grupo",
    nombreUI: "Grupo",
    tipo: 'int'
});

const planilla_categoria = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "categoria",
    nombreEnBD: "Categoria",
    nombreUI: "Categoria",
    tipo: 'varchar',
    formato: categorias
});

export const planilla_productoSolicitado = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "productoSolicitado",
    nombreEnBD: "Producto_Solicitado",
    nombreUI: "Producto Solicitado",
    tipo: 'text'
});

const planilla_marca = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "marca",
    nombreEnBD: "Marca",
    nombreUI: "Marca",
    tipo: 'varchar'
});

const planilla_modelo = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "modelo",
    nombreEnBD: "Modelo",
    nombreUI: "Modelo",
    tipo: 'varchar'
});

const planilla_medida = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "medida",
    nombreEnBD: "Medida",
    nombreUI: "Unidad de Medida",
    tipo: 'varchar',
    formato:unidad_medidas
});

const planilla_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'int'
});

const planilla_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const planilla_traza = new Columna({ 
    tablaMadreEnBD: tablaMadrePlanilla,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const planilla_columnasTodas = [
    planilla_codReq,
    planilla_categoria,
    planilla_productoSolicitado,
    planilla_marca,
    planilla_modelo,
    planilla_medida,
    planilla_cantidad,
    planilla_ediciones,
    planilla_traza
];
