// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { Monedas } from "../data/estados_data.js";


export const tablaMadreInterbank = {
    nombre: "interbank",
    fechaGuia: 'Fecha de Operación',
    alias: 'inte'
};

const interbank_fechaOperacion = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "fechaOperacion",
    nombreEnBD: "Fecha_de_operacion",
    nombreUI: "Fecha de Operación",
    tipo: 'varchar'
});

const interbank_fechaProceso = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "fechaProceso",
    nombreEnBD: "Fecha_de_proceso",
    nombreUI: "Fecha de Proceso",
    tipo: 'varchar'
});

const interbank_numeroOperacion = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "numeroOperacion",
    nombreEnBD: "Nro._de_operacion",
    nombreUI: "Número de Operación",
    tipo: 'varchar'
});

const interbank_movimiento = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "movimiento",
    nombreEnBD: "Movimiento",
    nombreUI: "Movimiento",
    tipo: 'varchar'
});

const interbank_descripcion = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "descripcion",
    nombreEnBD: "Descripcion",
    nombreUI: "Descripción",
    tipo: 'varchar'
});

const interbank_canal = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "canal",
    nombreEnBD: "Canal",
    nombreUI: "Canal",
    tipo: 'varchar'
});

const interbank_cargo = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "cargo",
    nombreEnBD: "Cargo",
    nombreUI: "Cargo",
    tipo: 'decimal'
});

const interbank_abono = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "abono",
    nombreEnBD: "Abono",
    nombreUI: "Abono",
    tipo: 'decimal'
});

const interbank_moneda = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

const interbank_saldoContable = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "saldoContable",
    nombreEnBD: "Saldo_contable",
    nombreUI: "Saldo Contable",
    tipo: 'decimal'
});

const interbank_conciliacion = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "conciliacion",
    nombreEnBD: "Conciliacion",
    nombreUI: "Conciliación",
    tipo: 'int'
});

const interbank_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

const interbank_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreInterbank,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const interbank_columnasTodas = [
    interbank_fechaOperacion,
    interbank_fechaProceso,
    interbank_numeroOperacion,
    interbank_movimiento,
    interbank_descripcion,
    interbank_canal,
    interbank_cargo,
    interbank_abono,
    interbank_moneda,
    interbank_saldoContable,
    interbank_conciliacion,
    interbank_ediciones,
    interbank_traza
];
