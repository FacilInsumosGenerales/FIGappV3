import { Buscador } from "../componentes/Buscador.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { comprobante_columnasTodas, comprobante_Proveedor, comprobante_traza, tablaMadreComprobante } from "../modelos/Comprobante.js";
import { contacto_empresa,contacto_celular,contacto_email,contacto_ediciones, contacto_apellido } from "../modelos/Contactos.js";
import { movimiento_columnasTodas, tablaMadreMovimientosBancarios } from "../modelos/MovBancarios.js";
import { ocProveedor_columnasTodas, ocProveedor_traza, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { pago_comprobante, pago_movimiento, tablaMadrePagosRelacionados } from "../modelos/PagosRel.js";
import { prodLogistica_columnasTodas, prodLogistica_producto, tablaMadreProdLogistica } from "../modelos/ProdLogistica.js";
import { prodOcProv_columnasTodas, prodOcProv_ocProveedor, prodOcProv_traza, tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";

const buscador  = new Buscador();


// OC proveedores
const columnasOCProveedores = [
    ... ocProveedor_columnasTodas,
    contacto_empresa,
    contacto_apellido,
    contacto_celular,
    contacto_email,
    contacto_ediciones
];

const detalleJSONOCProveedores = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaIzquierdaAlias": "cont",
            "nombreTablaDerecha":"ocPr",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Proveedor"
        },]
}

const recopOCProveedores= new RecopiladorDatos(columnasOCProveedores, tablaMadreOcProveedores, {buscador:buscador},detalleJSONOCProveedores)
const tablaOCProveedores = TablaVistaFabrica.crear(recopOCProveedores, true,{},);



//Productos en OC
const conectoresProdOCProv = {
    tablaMadre: 
    {
        columnaLocal: prodOcProv_ocProveedor,
        tablaReferencia: tablaOCProveedores,
        columnaReferencia:ocProveedor_traza, 
    }
}
const recopProdOCProv = new RecopiladorDatos(prodOcProv_columnasTodas,tablaMadreProdOcProv, conectoresProdOCProv)
const tablaProdOCProv = TablaVistaFabrica.crear(recopProdOCProv)


// Productos en logistica
const conectoresProdLogistica = {
    tablaMadre: 
    {
        columnaLocal: prodLogistica_producto,
        tablaReferencia: tablaProdOCProv,
        columnaReferencia:prodOcProv_traza, 
    }
}
const recopProdLogistica = new RecopiladorDatos(prodLogistica_columnasTodas,tablaMadreProdLogistica, conectoresProdLogistica)
const tablaProdLogistica = TablaVistaFabrica.crear(recopProdLogistica)


// Comprobantes de pago
const conectoresFacturas = {
    tablaMadre: 
    {
        columnaLocal: comprobante_Proveedor,
        tablaReferencia: tablaProdOCProv,
        columnaReferencia:prodOcProv_traza, 
        dependiente: false
    }
}
const recopFacturas = new RecopiladorDatos(comprobante_columnasTodas,tablaMadreComprobante, conectoresFacturas)
const tablaFacturas = TablaVistaFabrica.crear(recopFacturas)

// Abonos

const columnas_abonos =[
    ...movimiento_columnasTodas,
    pago_comprobante
]
const conector_abonos = {
    tablaMadre: 
    {
        columnaLocal: pago_comprobante,
        tablaReferencia: tablaFacturas,
        columnaReferencia: comprobante_traza,
        dependiente: false
    }
};
const detallesJSON_abonos =  {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadrePagosRelacionados.nombre,
            "nombreTablaIzquierdaAlias":tablaMadrePagosRelacionados.alias,
            "nombreTablaDerecha":tablaMadreMovimientosBancarios.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":pago_movimiento.nombreEnBD,
            "campoDerecha":"TRAZA",
        }
    ],
    "groupby": [
        {
            "tabla":tablaMadreMovimientosBancarios.alias,
            "columna": "TRAZA",
        }
    ]
}
const recop_abonos = new RecopiladorDatos(columnas_abonos,tablaMadreMovimientosBancarios,conector_abonos,detallesJSON_abonos);
const tabla_abonosClientes = TablaVistaFabrica.crear(recop_abonos);


$(document).ready(async function(){

    buscador.renderizar();

    await tablaOCProveedores.renderizar('tblOrdenes');
    await tablaProdOCProv.renderizar('tblProdOC');
    tablaProdLogistica.renderizar('tblProdLogistica');
    await tablaFacturas.renderizar('tblFacturas');
    tabla_abonosClientes.renderizar('tblAbonos');

});