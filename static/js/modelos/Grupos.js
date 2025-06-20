// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { unidad_medidas } from "../data/estados_data.js";


export const tablaMadreGrupos = {
    nombre: "grupos",
    fechaGuia: 'Fecha de Creación',
    alias: 'grup'
};

const grupo_descripcion = new Columna({ 
    tablaMadreEnBD: tablaMadreGrupos,
    nombre: "descripcion",
    nombreEnBD: "Descripcion",
    nombreUI: "Descripción",
    tipo: 'varchar'
});

const grupo_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadreGrupos,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'int'
});

const grupo_medida = new Columna({ 
    tablaMadreEnBD: tablaMadreGrupos,
    nombre: "medida",
    nombreEnBD: "Medida",
    nombreUI: "Unidad de Medida",
    tipo: 'varchar',
    formato: unidad_medidas
});

const grupo_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreGrupos,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const grupo_columnasTodas = [
    grupo_descripcion,
    grupo_cantidad,
    grupo_medida,
    grupo_traza
];