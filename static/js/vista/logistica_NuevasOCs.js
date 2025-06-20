
import { contacto_empresa, contacto_traza, tablaMadreContactos } from "../modelos/Contactos.js";
import { cotizacion_codReq, cotizacion_traza, tablaMadreCotizaciones } from "../modelos/Cotizaciones.js";
import { datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_nombreProducto, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { ocCliente_ediciones, ocCliente_fechaEmision, ocCliente_lugarEntrega, ocCliente_numeroCotizacion, ocCliente_numeroOCCliente, tablaMadreOcClientes } from "../modelos/OCCliente.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { Informe } from "../componentes/informe/BaseInforme.js";
import { ocProveedor_columnasTodas, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";
import { prodOcCliente_ocCliente, tablaMadreProdOcCliente } from "../modelos/ProdOcCliente.js";
import { prodLogistica_columnasTodas, prodLogistica_ocCliente, tablaMadreProdLogistica } from "../modelos/ProdLogistica.js";
import { guias_columnasTodas, guias_OCClienteTRAZA, tablaMadreGuias } from "../modelos/Guias.js";


// OC a ser conseguida o enviada de otra pagina. Tambien podriamos poner una tabla??
const traza_OC = 1;

// Informe de OC
const columnas_infoOC = [
    ocCliente_numeroOCCliente,
    ocCliente_lugarEntrega,
    ocCliente_fechaEmision,
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    contacto_empresa,
    ocCliente_ediciones
]
const detallesJSON_infoOC = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda":tablaMadreCotizaciones.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreCotizaciones.alias,
            "nombreTablaDerecha":tablaMadreOcClientes.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":cotizacion_traza.nombreEnBD,
            "campoDerecha":ocCliente_numeroCotizacion.nombreEnBD
        },
        {
            "nombreTablaIzquierda":tablaMadreDatosGenerales.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreDatosGenerales.alias,
            "nombreTablaDerecha":tablaMadreCotizaciones.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":datosGenerales_traza.nombreEnBD,
            "campoDerecha":cotizacion_codReq.nombreEnBD
        },
        {
            "nombreTablaIzquierda":tablaMadreContactos.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreContactos.alias,
            "nombreTablaDerecha":tablaMadreDatosGenerales.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":contacto_traza.nombreEnBD,
            "campoDerecha":datosGenerales_contactoCliente.nombreEnBD
        }
    ],
    "datosFiltro": [
        {
            "tabla": tablaMadreOcClientes.alias,
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": traza_OC, 
            "siguienteOperacion": null
        }
    ]

}
const recop_infoOC = new RecopiladorDatos(columnas_infoOC,tablaMadreOcClientes, null,detallesJSON_infoOC);
const informe_infoOC = new Informe(recop_infoOC);



// OC proveedores
const detalles_OCProv = {
    "tablaJoins": 
        [{
            "nombreTablaIzquierda":tablaMadreProdOcProv.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdOcProv.alias,
            "nombreTablaDerecha":tablaMadreOcProveedores.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":"OC_proveedor",
            "campoDerecha":"TRAZA"
        },
        {
            "nombreTablaIzquierda":tablaMadreProdOcCliente.nombre,
            "nombreTablaIzquierdaAlias":tablaMadreProdOcCliente.alias,
            "nombreTablaDerecha":tablaMadreProdOcProv.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_OC_cliente"
        }],
    "datosFiltro": [
        {
            "tabla": tablaMadreProdOcCliente.alias,
            "columna": prodOcCliente_ocCliente.nombreEnBD,
            "operacion": "=",
            "comparador": traza_OC,
            "siguienteOperacion": null
        }
    ]
}
const recop_OCProv = new RecopiladorDatos(ocProveedor_columnasTodas,tablaMadreOcProveedores,null,detalles_OCProv);
const tabla_OCProv = TablaVistaFabrica.crear(recop_OCProv);



// Prod en logistica
const detallesJSON_prodLogistica = {
    "datosFiltro": [
        {
            "tabla": tablaMadreProdLogistica.alias,
            "columna": prodLogistica_ocCliente.nombreEnBD,
            "operacion": "=",
            "comparador": traza_OC,
            "siguienteOperacion": null
        }
    ]
}
const recopProdLogistica = new RecopiladorDatos(prodLogistica_columnasTodas,tablaMadreProdLogistica,null, detallesJSON_prodLogistica);
const tablaProdLogistica = TablaVistaFabrica.crear(recopProdLogistica);



// Lugares



// Guias
const detallesJSON_guias = {
    "datosFiltro": [
        {
            "tabla": tablaMadreGuias.alias,
            "columna": guias_OCClienteTRAZA.nombreEnBD,
            "operacion": "=",
            "comparador": traza_OC,
            "siguienteOperacion": null
        }
    ]
}  
const recop_guias = new RecopiladorDatos(guias_columnasTodas,tablaMadreGuias,null, detallesJSON_guias);
const tablaGuia = TablaVistaFabrica.crear(recop_guias);




$(document).ready(async function() { 

    informe_infoOC.renderizar("divInfoOcCliente"); 
    tabla_OCProv.renderizar('tblOCProveedores');
    tablaProdLogistica.renderizar("tblProductosLogistica");
    tablaGuia.renderizar("tblGuias");    

    
});
