// Datos copiados de ChatGPT no revisados!!!!
import { Columna } from "../componentes/Columna.js";
import { ofertas_contactoProveedor, ofertas_fechaDeRegistro } from "./Ofertas.js";
import { planilla_productoSolicitado } from "./Planilla.js";


export const tablaMadreProdOfertas = {
    nombre: "bd_cotizaciones_de_proveedores",
    alias: 'pOfe'
};

export const prodOferta_oferta = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "oferta",
    nombreEnBD: "Cotizacion",
    nombreUI: "Oferta de proveedor",
    tipo: 'TRAZA',
    formato: [ofertas_fechaDeRegistro,': ',ofertas_contactoProveedor],
    obligatorio: true
});

export const prodOferta_productoSolicitado = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "productoSolicitado",
    nombreEnBD: "Producto_Solicitado",
    nombreUI: "Producto Solicitado",
    tipo: 'TRAZA',
    formato: planilla_productoSolicitado
});

export const prodOferta_descripcionProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "descripcionProveedor",
    nombreEnBD: "Descripcion_proveedor",
    nombreUI: "Descripción del Proveedor",
    tipo: 'text'
});

export const prodOferta_descripcionCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "descripcionCliente",
    nombreEnBD: "Descripcion_cliente",
    nombreUI: "Descripción del Cliente",
    tipo: 'text'
});

const prodOferta_marca = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "marca",
    nombreEnBD: "Marca",
    nombreUI: "Marca",
    tipo: 'varchar'
});

const prodOferta_modelo = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "modelo",
    nombreEnBD: "Modelo",
    nombreUI: "Modelo",
    tipo: 'varchar'
});

const prodOferta_peso = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "peso",
    nombreEnBD: "Peso_kg",
    nombreUI: "Peso (kg)",
    tipo: 'decimal'
});

const prodOferta_volumen = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "volumen",
    nombreEnBD: "Volumen_m3",
    nombreUI: "Volumen (m³)",
    tipo: 'decimal'
});

export const prodOferta_diasEntregaProveedor = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "diasEntregaProveedor",
    nombreEnBD: "Dias_entrega_proveedor",
    nombreUI: "Días de Entrega Proveedor",
    tipo: 'int'
});

export const prodOferta_diasEntregaCliente = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "diasEntregaCliente",
    nombreEnBD: "Dias_entrega_cliente",
    nombreUI: "Días de Entrega Cliente",
    tipo: 'int'
});

const prodOferta_medida = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "medida",
    nombreEnBD: "Medida",
    nombreUI: "Unidad de Medida",
    tipo: 'varchar'
});

export const prodOferta_cantidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "cantidad",
    nombreEnBD: "Cantidad",
    nombreUI: "Cantidad",
    tipo: 'int'
});

export const prodOferta_costoUnidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "costoUnidad",
    nombreEnBD: "Costo_x_Unidad_SIN_IGV_en_moneda_de_oferta",
    nombreUI: "Costo x Unidad (SIN IGV)",
    tipo: 'decimal'
});

export const prodOferta_precioVentaUnidad = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "precioVentaUnidad",
    nombreEnBD: "Precio_Venta_x_Unidad_SIN_IGV_en_moneda_de_oferta",
    nombreUI: "Precio Venta x Unidad (SIN IGV)",
    tipo: 'decimal'
});

const prodOferta_link = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "link",
    nombreEnBD: "Link",
    nombreUI: "Enlace",
    tipo: 'varchar'
});

// Esta columna se podria ir. Es de legacy
const prodOferta_habilitar = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "habilitar",
    nombreEnBD: "Habilitar_y_Deshabilitar",
    nombreUI: "Habilitar / Deshabilitar",
    tipo: 'boolean'
});

const prodOferta_adjuntoFicha = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "adjuntoFicha",
    nombreEnBD: "Adjunto_Ficha_Tecnica",
    nombreUI: "Adjunto Ficha Técnica",
    tipo: 'file'
});

export const prodOferta_imagen = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "imagen",
    nombreEnBD: "Imagen_Referencial",
    nombreUI: "Imagen Referencial",
    tipo: 'file'
});

const prodOferta_ediciones = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "ediciones",
    nombreEnBD: "Ediciones",
    nombreUI: "Historial de Ediciones",
    tipo: 'text'
});

export const prodOferta_traza = new Columna({ 
    tablaMadreEnBD: tablaMadreProdOfertas,
    nombre: "traza",
    nombreEnBD: "TRAZA",
    nombreUI: "TRAZA",
    tipo: 'int'
});

export const prodOferta_columnasCasiTodas = [
    prodOferta_oferta,
    prodOferta_productoSolicitado,
    prodOferta_descripcionProveedor,
    prodOferta_descripcionCliente,
    prodOferta_marca,
    prodOferta_modelo,
    prodOferta_diasEntregaProveedor,
    prodOferta_diasEntregaCliente,
    prodOferta_medida,
    prodOferta_cantidad,
    prodOferta_costoUnidad,
    prodOferta_precioVentaUnidad,
    prodOferta_link,
    prodOferta_adjuntoFicha,
    prodOferta_imagen,
    prodOferta_ediciones,
    prodOferta_traza
];

const prodOferta_columnasTodas = [
    prodOferta_oferta,
    prodOferta_productoSolicitado,
    prodOferta_descripcionProveedor,
    prodOferta_descripcionCliente,
    prodOferta_marca,
    prodOferta_modelo,
    prodOferta_peso,
    prodOferta_volumen,
    prodOferta_diasEntregaProveedor,
    prodOferta_diasEntregaCliente,
    prodOferta_medida,
    prodOferta_cantidad,
    prodOferta_costoUnidad,
    prodOferta_precioVentaUnidad,
    prodOferta_link,
    prodOferta_habilitar,
    prodOferta_adjuntoFicha,
    prodOferta_imagen,
    prodOferta_ediciones,
    prodOferta_traza
];