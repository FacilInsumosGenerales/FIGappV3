// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadreLugares = {
    nombre: "lugares",
    fechaGuia: 'Fecha de Registro',
    alias: 'luga'
};

export const lugar_nombre = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "nombre",
    nombreEnBD: "Nombre_de_lugar",
    nombreUI: "Nombre del Lugar",
    tipo: 'text'
});

export const lugar_direccion = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "direccion",
    nombreEnBD: "Direccion",
    nombreUI: "Dirección",
    tipo: 'text'
});

const lugar_departamento = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "departamento",
    nombreEnBD: "Departamento",
    nombreUI: "Departamento",
    tipo: 'text'
});

const lugar_requisitosIngreso = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "requisitosIngreso",
    nombreEnBD: "Requisitos_Ingreso_Local",
    nombreUI: "Requisitos de Ingreso",
    tipo: 'text'
});

const lugar_horarioAtencion = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "horarioAtencion",
    nombreEnBD: "Horario_de_atencion",
    nombreUI: "Horario de Atención",
    tipo: 'text'
});

const lugar_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const lugar_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreLugares,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const lugar_columnasTodas = [
    lugar_nombre,
    lugar_direccion,
    lugar_departamento,
    lugar_requisitosIngreso,
    lugar_horarioAtencion,
    lugar_ediciones,
    lugar_traza
];
