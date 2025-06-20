import { Buscador } from "../componentes/Buscador.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { comprobante_columnasTodas, comprobante_traza, tablaMadreComprobante } from "../modelos/Comprobante.js";
import { contacto_empresa, tablaMadreContactos } from "../modelos/Contactos.js";
import { guias_columnasTodas, guias_OCClienteTRAZA, tablaMadreGuias } from "../modelos/Guias.js";
import {  movLogistico_columnasTodas, movLogistico_comprobantes, movLogistico_traza, tablaMadreMovLogisticos } from "../modelos/MovLogisticos.js";
import { ocCliente_columnasTodas, ocCliente_traza, tablaMadreOcClientes } from "../modelos/OCCliente.js";
import { ocProveedor_columnasTodas, ocProveedor_proveedor, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { prodLogistica_columnasTodas, prodLogistica_producto, prodLogistica_traza, tablaMadreProdLogistica } from "../modelos/ProdLogistica.js";
import { prodMovimiento_movimiento, prodMovimiento_producto, tablaMadreProdMovimiento } from "../modelos/ProdMovimiento.js";
import { prodOcCliente_ocCliente, prodOcCliente_productoCotizado, tablaMadreProdOcCliente } from "../modelos/ProdOcCliente.js";
import { prodOcProv_ocProveedor, prodOcProv_productoCotizado, prodOcProv_productoOcCliente, prodOcProv_traza, tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";

const buscador = new Buscador();

// Movimiento logistico
const recop_movLogisticos = new RecopiladorDatos(movLogistico_columnasTodas, tablaMadreMovLogisticos,{buscador:buscador});
const tabla_movLogisticos = TablaVistaFabrica.crear(recop_movLogisticos);




// Productos en el movimiento
const columnas_ProdMovimiento = [
    ...prodLogistica_columnasTodas,
    prodOcProv_productoCotizado
]

const innerProdMovimientoInfo = {
    "tablaJoins": [
            {
                "nombreTablaIzquierda":tablaMadreProdMovimiento.nombre,
                "nombreTablaIzquierdaAlias":tablaMadreProdMovimiento.alias,
                "nombreTablaDerecha":tablaMadreProdLogistica.alias,
                "tipoRelacion":"INNER",
                "campoIzquierda":prodMovimiento_producto.nombreEnBD,
                "campoDerecha":prodLogistica_traza.nombreEnBD
            },
            {
                "nombreTablaIzquierda":tablaMadreProdOcProv.nombre,
                "nombreTablaIzquierdaAlias":tablaMadreProdOcProv.alias,
                "nombreTablaDerecha":tablaMadreProdLogistica.alias,
                "tipoRelacion":"INNER",
                "campoIzquierda":prodOcProv_traza.nombreEnBD,
                "campoDerecha":prodLogistica_producto.nombreEnBD
            },
            
        ]
}

const conector_prodMovimiento = {
    tablaMadre: 
    {
        columnaLocal: prodMovimiento_movimiento,
        tablaReferencia: tabla_movLogisticos,
        columnaReferencia: movLogistico_traza, 
    }
}

const recop_prodMov = new RecopiladorDatos(columnas_ProdMovimiento,tablaMadreProdLogistica,conector_prodMovimiento,
    innerProdMovimientoInfo);
const tabla_prodMov = TablaVistaFabrica.crear(recop_prodMov);


//Imagenes del movimiento (imagenes personalizadas)

// Lugares (informe)


//OC proveedores
const columnasOCProveedores = [
    ... ocProveedor_columnasTodas,
    contacto_empresa,
    prodOcProv_productoCotizado,
    prodOcProv_productoOcCliente
    
];
const detallesJSONOCProveedores = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreProdOcProv.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdOcProv.alias,
            "nombreTablaDerecha":tablaMadreOcProveedores.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":prodOcProv_ocProveedor.nombreEnBD ,
            "campoDerecha":"TRAZA",
        },
        {
            "nombreTablaIzquierda":tablaMadreContactos.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreContactos.alias,
            "nombreTablaDerecha":tablaMadreOcProveedores.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":ocProveedor_proveedor.nombreEnBD,
        }
    ],
    "groupby": [
        {
            "tabla":tablaMadreOcProveedores.alias,
            "columna": "TRAZA",
        }
    ]
}
const conectorOCProveedores= {
    tablaMadre: 
    {
        columnaLocal: prodOcProv_productoCotizado,
        tablaReferencia: tabla_prodMov,
        columnaReferencia: prodOcProv_productoCotizado, 
        dependiente: false, // esto hace que la tabla de referencia no modifique sus clicks
    }
}  
const recopOCProveedores = new RecopiladorDatos(columnasOCProveedores,tablaMadreOcProveedores,conectorOCProveedores,detallesJSONOCProveedores)
const tablaCProveedores = TablaVistaFabrica.crear(recopOCProveedores)


// OC clientes
const columnas_ocCliente = [
    ... ocCliente_columnasTodas,
    prodOcCliente_productoCotizado,
]
const detallesJSON_ocCliente = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreProdOcCliente.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdOcCliente.alias,
            "nombreTablaDerecha":tablaMadreOcClientes.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":prodOcCliente_ocCliente.nombreEnBD,
            "campoDerecha":ocCliente_traza.nombreEnBD,
        }  
    ],
    "groupby": [
        {
            "tabla":tablaMadreOcClientes.alias,
            "columna": "TRAZA",
        }
    ]
}
const conector_ocCliente= {
    tablaMadre: 
    {
        columnaLocal: prodOcCliente_productoCotizado,
        tablaReferencia: tablaCProveedores,
        columnaReferencia: prodOcProv_productoOcCliente, 
        dependiente: false, // esto hace que la tabla de referencia no modifique sus clicks    
    }
}
const recop_ocCliente = new RecopiladorDatos(columnas_ocCliente,tablaMadreOcClientes,conector_ocCliente,detallesJSON_ocCliente)
const tabla_ocCliente = TablaVistaFabrica.crear(recop_ocCliente)
  
// Guias
const conector_guias= {
    tablaMadre: 
    {
        columnaLocal: guias_OCClienteTRAZA,
        tablaReferencia: tabla_ocCliente,
        columnaReferencia: ocCliente_traza, 
        dependiente: false, // esto hace que la tabla de referencia no modifique sus clicks    
    }
}
const recop_guias = new RecopiladorDatos(guias_columnasTodas,tablaMadreGuias,conector_guias);
const tabla_guias = TablaVistaFabrica.crear(recop_guias);


// Comprobantes de pago
const conector_factura= {
    tablaMadre: 
    {
        columnaLocal: comprobante_traza,
        tablaReferencia: tabla_movLogisticos,
        columnaReferencia: movLogistico_comprobantes, 
    }
}
const recop_facturas = new RecopiladorDatos(comprobante_columnasTodas, tablaMadreComprobante,conector_factura);
const tabla_facturas = TablaVistaFabrica.crear(recop_facturas); // Esto estaria mejor como informe que como tabla ya que solo puede ser un elemento

$(document).ready(async function(){
    buscador.renderizar();

    await tabla_movLogisticos.renderizar("tblMovimientosLogisticos");
    tabla_facturas.renderizar('tblFacturas');
    await tabla_prodMov.renderizar('divTblProductos');
    await tablaCProveedores.renderizar('tblOcProveedores');
    await tabla_ocCliente.renderizar('tblOcClientes');
    tabla_guias.renderizar('tblGuias');
});