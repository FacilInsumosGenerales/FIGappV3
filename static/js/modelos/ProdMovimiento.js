// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadreProdMovimiento = {
    nombre: "productos_en_movimiento",
    alias: 'pMov'
};

export const prodMovimiento_producto = new Columna({ 
    tablaMadreEnBD: tablaMadreProdMovimiento,
    nombre: "producto",
    nombreEnBD: "Producto",
    nombreUI: "Producto",
    tipo: 'TRAZA'
});

const prodMovimiento_grupo = new Columna({ 
    tablaMadreEnBD: tablaMadreProdMovimiento,
    nombre: "grupo",
    nombreEnBD: "Grupo",
    nombreUI: "Grupo",
    tipo: 'TRAZA'
});

export const prodMovimiento_movimiento = new Columna({ 
    tablaMadreEnBD: tablaMadreProdMovimiento,
    nombre: "movimiento",
    nombreEnBD: "Movimiento",
    nombreUI: "Movimiento",
    tipo: 'TRAZA'
});

const prodMovimiento_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdMovimiento,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const prodMovimiento_columnasTodas = [
    prodMovimiento_producto,
    prodMovimiento_grupo,
    prodMovimiento_movimiento,
    prodMovimiento_traza
];
