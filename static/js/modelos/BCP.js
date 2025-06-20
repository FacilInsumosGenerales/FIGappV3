import { Columna } from "../componentes/Columna.js";
import { Monedas } from "../data/estados_data.js";

export const tablaMadreBCP = {
    nombre: "bcp",
    fechaGuia: 'Fecha',
    alias: "bcp",
};

const bcp_fecha = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "fecha",    
    nombreEnBD: "Fecha",
    nombreUI: "Fecha",
    tipo: 'datetime',
    obligatorio: true
});

const bcp_descripcion = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "descripcion",
    nombreEnBD: "Descripcion",
    nombreUI: "Descripción",
    tipo: 'text'
});

const bcp_monto = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "monto",
    nombreEnBD: "Monto",
    nombreUI: "Monto",
    tipo: 'decimal'
});

const bcp_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

const bcp_saldo = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "saldo",
    nombreEnBD: "Saldo",
    nombreUI: "Saldo Disponible",
    tipo: 'decimal'
});

const bcp_bcp = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "bcp",
    nombreEnBD: "BCP",
    nombreUI: "BCP",
    tipo: 'boolean'
});

const bcp_conciliacion = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "conciliacion",
    nombreEnBD: "Conciliacion",
    nombreUI: "Conciliación Bancaria",
    tipo: 'TRAZA'
});

const bcp_contable = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "contable",
    nombreEnBD: "Contable",
    nombreUI: "Registro Contable",
    tipo: 'boolean'
});

const bcp_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const bcp_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreBCP,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const bcp_columnasTodas = [
    bcp_fecha,
    bcp_descripcion,
    bcp_monto,
    bcp_moneda,
    bcp_saldo,
    bcp_bcp,
    bcp_conciliacion,
    bcp_contable,
    bcp_ediciones,
    bcp_traza
];
