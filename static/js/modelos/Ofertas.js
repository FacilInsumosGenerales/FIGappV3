// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { Monedas } from "../data/estados_data.js";
import { contacto_identificacion } from "./Contactos.js";

export const tablaMadreOfertas = {
    nombre: "cotizaciones_proveedores",
    fechaGuia: 'Fecha_de_Registro',
    alias: 'ofer'
};

export const ofertas_moneda = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "moneda",
    nombreEnBD: "Moneda",
    nombreUI: "Moneda",
    tipo: 'varchar',
    formato: Monedas
});

export const ofertas_contactoProveedor = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "contactoProveedor",
    nombreEnBD: "Contacto_proveedor",
    nombreUI: "Contacto del Proveedor",
    tipo: 'int',
    formato: contacto_identificacion,
    obligatorio: true
});

const ofertas_adjunto = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "adjunto",
    nombreEnBD: "Adjunto",
    nombreUI: "Adjunto",
    tipo: 'file'
});

export const ofertas_fechaDeRegistro = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "fechaDeRegistro",
    nombreEnBD: "Fecha_de_Registro",
    nombreUI: "Fecha de Registro",
    tipo: 'datetime'
});

const ofertas_ediciones = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const ofertas_traza = new Columna({
    tablaMadreEnBD: tablaMadreOfertas,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const ofertas_columnasTodas = [
    ofertas_moneda,
    ofertas_contactoProveedor,
    ofertas_adjunto,
    ofertas_fechaDeRegistro,
    ofertas_ediciones,
    ofertas_traza
];
