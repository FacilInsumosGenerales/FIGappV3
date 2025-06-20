// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";


export const tablaMadrePagosRelacionados = {
    nombre: "pagos_relacionados",
    alias: 'paRe'
};

export const pago_comprobante = new Columna({ 
    tablaMadreEnBD: tablaMadrePagosRelacionados,
    nombre: "comprobante",
    nombreEnBD: "Comprobante",
    nombreUI: "Comprobante",
    tipo: 'int'
});

export const pago_movimiento = new Columna({ 
    tablaMadreEnBD: tablaMadrePagosRelacionados,
    nombre: "movimiento",
    nombreEnBD: "Movimiento",
    nombreUI: "Movimiento",
    tipo: 'int'
});

const pago_monto = new Columna({ 
    tablaMadreEnBD: tablaMadrePagosRelacionados,
    nombre: "monto",
    nombreEnBD: "Monto",
    nombreUI: "Monto",
    tipo: 'decimal'
});

const pago_traza = new Columna({ 
    tablaMadreEnBD: tablaMadrePagosRelacionados,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const pago_columnasTodas = [
    pago_comprobante,
    pago_movimiento,
    pago_monto,
    pago_traza
];
