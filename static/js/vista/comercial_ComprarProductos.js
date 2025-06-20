import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { contacto_empresa, tablaMadreContactos } from "../modelos/Contactos.js";
import { cotizacion_codReq } from "../modelos/Cotizaciones.js";
import { ocCliente_estado, ocCliente_fechaEmision, ocCliente_numeroOCCliente, ocCliente_traza, ocCliente_valorSinIGV, tablaMadreOcClientes } from "../modelos/OCCliente.js";
import { ocProveedor_columnasTodas, ocProveedor_proveedor, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { prodOcCliente_cantidad, prodOcCliente_fechaEntregaMaxima, prodOcCliente_ocCliente, prodOcCliente_productoCotizado, tablaMadreProdOcCliente } from "../modelos/ProdOcCliente.js";
import { prodOcProv_ocProveedor, prodOcProv_productoCotizado, tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";
import { prodOferta_columnasCasiTodas, prodOferta_productoSolicitado, prodOferta_traza, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";


// OC de clientes
const columnasOCClientes = [
    cotizacion_codReq,
    ocCliente_numeroOCCliente,
    ocCliente_valorSinIGV,
    ocCliente_fechaEmision,
    ocCliente_estado,
    contacto_empresa,
    ocCliente_traza
];
const detalleJSONOCClientes = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaIzquierdaAlias":"cont",
            "nombreTablaDerecha":"ocCl",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Contacto_cliente"
        },
        {
            "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
            "nombreTablaIzquierdaAlias":"coti",
            "nombreTablaDerecha":"ocCl",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Numero_de_Cotizacion"
        },
    ]
}
const recopOCClientes = new RecopiladorDatos(columnasOCClientes,tablaMadreOcClientes,null,detalleJSONOCClientes);

const tablaConfigOCClientes= {
    rowSelection: {
        mode: 'multiRow',
    },
};
const tablaOCClientes = TablaVistaFabrica.crear(recopOCClientes,false,tablaConfigOCClientes)


// Productos en oc
const detallesJSONProdOC = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"bd_cotizaciones_de_proveedores",
            "nombreTablaIzquierdaAlias":"pOfe",
            "nombreTablaDerecha":"pOCl",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_cotizado"
        },
    ]
}
const conectorProdOC= {
    tablaMadre: 
    {
        columnaLocal: prodOcCliente_ocCliente,
        tablaReferencia: tablaOCClientes,
        columnaReferencia: ocCliente_traza, 
    }
}

const columnasProdOC = [
    prodOcCliente_productoCotizado,
    prodOferta_productoSolicitado, 
    prodOcCliente_cantidad,
    prodOcCliente_fechaEntregaMaxima,
    prodOcCliente_ocCliente
];

const recopProductOCs = new RecopiladorDatos(columnasProdOC,tablaMadreProdOcCliente,conectorProdOC,detallesJSONProdOC)
const tablaProductoOCs = TablaVistaFabrica.crear(recopProductOCs);



// Productos ofrecidos
const conectorProdOfertas= {
    tablaMadre: 
    {
        columnaLocal: prodOferta_productoSolicitado,
        tablaReferencia: tablaProductoOCs,
        columnaReferencia: prodOferta_productoSolicitado, 
        dependiente: false, // esto hace que la tabla de referencia no modifique sus clicks
    }
}    
const recopProdOfertas = new RecopiladorDatos(prodOferta_columnasCasiTodas,tablaMadreProdOfertas,conectorProdOfertas)
const tablaProdOfertas = TablaVistaFabrica.crear(recopProdOfertas);



// OC a proveedores
const columnasOCProveedores = [
    ... ocProveedor_columnasTodas,
    contacto_empresa,
    prodOcProv_productoCotizado
    
];
const detallesJSONOCProveedores = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreOcProveedores.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreOcProveedores.alias,
            "nombreTablaDerecha":tablaMadreProdOcProv.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":prodOcProv_ocProveedor.nombreEnBD,
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
        tablaReferencia: tablaProdOfertas,
        columnaReferencia: prodOferta_traza, 
        dependiente: false, // esto hace que la tabla de referencia no modifique sus clicks
    }
}  
const recopOCProveedores = new RecopiladorDatos(columnasOCProveedores,tablaMadreProdOcProv,conectorOCProveedores,detallesJSONOCProveedores)
const tablaCProveedores = TablaVistaFabrica.crear(recopOCProveedores)

$(document).ready(async function(){

    await tablaOCClientes.renderizar('tblOcClientes');
	await tablaProductoOCs.renderizar('tbProductosOC');
	await tablaProdOfertas.renderizar('tblProductosProveedores');
    tablaCProveedores.renderizar('tblOCProveedores');

});


