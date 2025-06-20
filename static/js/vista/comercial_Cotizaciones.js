import { Buscador } from "../componentes/Buscador.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { cotizacion_columnasTodas, cotizacion_traza, tablaMadreCotizaciones } from "../modelos/Cotizaciones.js";
import { prodCotizacion_columnasTodas, prodCotizacion_cotizacionCliente, prodCotizacion_cotizacionProveedor, tablaMadreProdCotizacion } from "../modelos/ProdCotizacion.js";
import { prodOferta_columnasCasiTodas, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";

const buscador = new Buscador(-1);



// Cotizacion
const recop_Cotizacion = new RecopiladorDatos(cotizacion_columnasTodas,tablaMadreCotizaciones,{buscador:buscador});
const tabla_cotizacion =  TablaVistaFabrica.crear(recop_Cotizacion);



// Productos en cotizacion
const detallesJSON_ProdCotizacion = {
    "tablaJoins": [
        {
            "nombreTablaIzquierda": tablaMadreProdCotizacion.nombre,
            "nombreTablaIzquierdaAlias": tablaMadreProdCotizacion.alias,
            "nombreTablaDerecha": tablaMadreProdOfertas.alias,
            "tipoRelacion":"INNER",
            "campoIzquierda":prodCotizacion_cotizacionProveedor.nombreEnBD,
            "campoDerecha":"TRAZA" 
        }     
    ]
};

const conector_ProdCotizacion= {
    tablaMadre: 
    {
        columnaLocal: prodCotizacion_cotizacionCliente,
        tablaReferencia: tabla_cotizacion,
        columnaReferencia: cotizacion_traza, 
    }
}

let columnas_ProdCotizacion = [
    ...prodCotizacion_columnasTodas,
    ... prodOferta_columnasCasiTodas
]

const recop_ProdCotizacion = new RecopiladorDatos(columnas_ProdCotizacion,tablaMadreProdOfertas,conector_ProdCotizacion,detallesJSON_ProdCotizacion);
const tabla_ProdCotizacion =  TablaVistaFabrica.crear(recop_ProdCotizacion);



$(document).ready(async function(){

    buscador.renderizar();
    await tabla_cotizacion.renderizar("tblCotizaciones");
    tabla_ProdCotizacion.renderizar("tblProductos");

});