import { Columna } from "../componentes/Columna.js";

export const tablaMadreEmpresas = {
    nombre: "empresas",
    alias: 'empr'
};

export const empresa_nombre = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "nombre",
    nombreEnBD: "Nombre",
    nombreUI: "Nombre de la Empresa",
    tipo: 'varchar'
});

export const empresa_proveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "proveedor",
    nombreEnBD: "Proveedor",
    nombreUI: "Es proveedor?",
    tipo: 'boolean'
});

export const empresa_cliente = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "cliente",
    nombreEnBD: "Cliente",
    nombreUI: "Es cliente?",
    tipo: 'boolean'
});

const empresa_logistica = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "logistica",
    nombreEnBD: "Logistica",
    nombreUI: "Es prov. logístico?",
    tipo: 'boolean'
});

export const empresa_ruc = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "ruc",
    nombreEnBD: "RUC",
    nombreUI: "RUC",
    tipo: 'varchar'
});

const empresa_telefono = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "telefono",
    nombreEnBD: "Telefono",
    nombreUI: "Teléfono",
    tipo: 'varchar'
});

const empresa_paginaWeb = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "paginaWeb",
    nombreEnBD: "Pagina_Web",
    nombreUI: "Página Web",
    tipo: 'varchar'
});

export const empresa_formaPago = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "formaPago",
    nombreEnBD: "Forma_de_pago",
    nombreUI: "Forma de Pago",
    tipo: 'varchar'
});

const empresa_favorito = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "favorito",
    nombreEnBD: "Favorito",
    nombreUI: "Es favorito?",
    tipo: 'boolean'
});

const empresa_adjunto = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "adjunto",
    nombreEnBD: "Adjunto",
    nombreUI: "Adjunto",
    tipo: 'varchar'
});

const empresa_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "observaciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Observaciones",
    tipo: 'text'
});

export const empresa_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreEmpresas,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const empresa_columnasTodas = [
    empresa_nombre,
    empresa_proveedor,
    empresa_cliente,
    empresa_logistica,
    empresa_ruc,
    empresa_telefono,
    empresa_paginaWeb,
    empresa_formaPago,
    empresa_favorito,
    empresa_adjunto,
    empresa_ediciones,
    empresa_traza
];
