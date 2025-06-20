// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadreProdGrupo = {
    nombre: "prodGrupo",
    fechaGuia: 'Fecha de Registro',
    alias: 'pGru'
};

const prodGrupo_grupo = new Columna({ 
    tablaMadreEnBD: tablaMadreProdGrupo,
    nombre: "grupo",
    nombreEnBD: "Grupo",
    nombreUI: "Grupo",
    tipo: 'int'
});

const prodGrupo_producto = new Columna({ 
    tablaMadreEnBD: tablaMadreProdGrupo,
    nombre: "producto",
    nombreEnBD: "Producto",
    nombreUI: "Producto",
    tipo: 'int'
});

const prodGrupo_cantidadProducto = new Columna({ 
    tablaMadreEnBD: tablaMadreProdGrupo,
    nombre: "cantidadProducto",
    nombreEnBD: "Cantidad_de_producto",
    nombreUI: "Cantidad de Producto",
    tipo: 'int'
});

export const prodGrupo_columnasTodas = [
    prodGrupo_grupo,
    prodGrupo_producto,
    prodGrupo_cantidadProducto
];
