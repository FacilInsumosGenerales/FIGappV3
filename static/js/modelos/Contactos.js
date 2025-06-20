import { Columna } from "../componentes/Columna.js";
import { empresa_nombre } from "./Empresas.js";

export const tablaMadreContactos = {
    nombre: "contactos",
    alias: "cont"
};


export const contacto_empresa = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "empresa",
    nombreEnBD: "Empresa",
    nombreUI: "Nombre de la Empresa",
    tipo: 'TRAZA',
    formato: empresa_nombre,
    obligatorio: true
});

export const contacto_nombre = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "nombre",
    nombreEnBD: "Nombre",
    nombreUI: "Nombre Contacto",
    tipo: 'text'
});

export const contacto_apellido = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "apellido",
    nombreEnBD: "Apellido",
    nombreUI: "Apellido",
    tipo: 'text'
});

export const contacto_celular = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "celular",
    nombreEnBD: "Celular",
    nombreUI: "Celular",
    tipo: 'text'
});

export const contacto_email = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "email",
    nombreEnBD: "Email",
    nombreUI: "Email",
    tipo: 'text'
});

export const contacto_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const contacto_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreContactos,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'TRAZA'
});

export const contacto_identificacion = [contacto_empresa,': ',contacto_nombre, ' ',contacto_apellido];

export const contacto_columnasTodas = [
    contacto_empresa,
    contacto_nombre,
    contacto_apellido,
    contacto_celular,
    contacto_email,
    contacto_ediciones,
    contacto_traza
];
