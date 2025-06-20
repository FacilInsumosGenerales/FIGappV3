import { Buscador } from "../componentes/Buscador.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVista } from "../componentes/TablaVista.js";
import { comprobante_columnasTodas, tablaMadreComprobante } from "../modelos/Comprobante.js";
import { ocCliente_columnasTodas, tablaMadreOcClientes } from "../modelos/OCCliente.js";
import { ocProveedor_columnasTodas, tablaMadreOcProveedores } from "../modelos/OCProveedores.js";
import { prodOcCliente_columnasTodas, tablaMadreProdOcCliente } from "../modelos/ProdOcCliente.js";
import { prodOcProv_columnasTodas, tablaMadreProdOcProv } from "../modelos/ProdOcProv.js";


const buscador = new Buscador();

const conectores = {buscador:buscador};

const ocClienteJoins = [
    {
        "nombreTablaIzquierda":"datos_generales_de_cotizaciones",
        "nombreTablaDerecha":"datos_generales_ocs_clientes",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Numero_de_Cotizacion"
    },
    {
        "nombreTablaIzquierda":"datos_generales_del_proceso",
        "nombreTablaDerecha":"datos_generales_de_cotizaciones",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Cod_Req"
    },
    {
        "nombreTablaIzquierda":"contactos",
        "nombreTablaDerecha":"datos_generales_ocs_clientes",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Contacto_Cliente"
    },
    {
        "nombreTablaIzquierda":"empresas",
        "nombreTablaDerecha":"contactos",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Empresa"
    },
    {
        "nombreTablaIzquierda":"lugares",
        "nombreTablaDerecha":"datos_generales_del_proceso",
        "tipoRelacion":"INNER",
        "campoIzquierda":"TRAZA",
        "campoDerecha":"Lugar_de_entrega_al_cliente"
    }
];
const recopOCCliente = new RecopiladorDatos(ocCliente_columnasTodas,tablaMadreOcClientes,conectores,ocClienteJoins);
const tablaOCCliente =  new TablaVista(recopOCCliente);

const recopProductosCliente = new RecopiladorDatos(prodOcCliente_columnasTodas,tablaMadreProdOcCliente,conectores);
const tablaProductosCliente =  new TablaVista(recopProductosCliente);

const recopProductosOcProveedor = new RecopiladorDatos(prodOcProv_columnasTodas,tablaMadreProdOcProv,conectores);
const tablaProductosOcProveedor =  new TablaVista(recopProductosOcProveedor);

const recopOcProveedor = new RecopiladorDatos(ocProveedor_columnasTodas,tablaMadreOcProveedores,conectores);
const tablaOcProveedor =  new TablaVista(recopOcProveedor);

const recopComprobante = new RecopiladorDatos(comprobante_columnasTodas,tablaMadreComprobante,conectores);
const tablaComprobante =  new TablaVista(recopComprobante);

$(document).ready(async function(){

    buscador.renderizar();

    tablaOCCliente.renderizar("tblOCClientes");
    tablaProductosCliente.renderizar("tblProductosCliente");
    tablaProductosOcProveedor.renderizar("tblProductosProveedor");
    tablaOcProveedor.renderizar("tblOCProveedores");
    tablaComprobante.renderizar("tblFacturas");
});