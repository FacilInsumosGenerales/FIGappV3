import { Informe } from "../componentes/informe/BaseInforme.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { datosGenerales_codReq, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_nombreProducto, datosGenerales_prioridad, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { prodOferta_columnasCasiTodas, prodOferta_oferta, prodOferta_productoSolicitado, tablaMadreProdOfertas } from "../modelos/ProdOfertas.js";
import { planilla_codReq, planilla_columnasTodas, planilla_grupo, planilla_productoSolicitado, planilla_traza, tablaMadrePlanilla } from "../modelos/Planilla.js";
import { contacto_empresa } from "../modelos/Contactos.js";
import {ofertas_columnasTodas, ofertas_moneda, tablaMadreOfertas } from "../modelos/Ofertas.js";

// Toda esta pagina puede ser parametrizada y refatorizada


const traza_req = "3724"

// Info general
const columnasInfo = [
    datosGenerales_codReq,
    datosGenerales_nombreProducto,
    datosGenerales_contactoCliente,
    datosGenerales_estado,
    datosGenerales_fechaRegistro,
    datosGenerales_prioridad
]
const detJSONInfo = {
    "datosFiltro": [
        {
            "tabla": "daGe",
            "columna": "TRAZA",
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recopInfo = new RecopiladorDatos(columnasInfo,tablaMadreDatosGenerales, null,detJSONInfo);
const informeInfo = new Informe(recopInfo);


// Productos solicitados
const detJSONPlanilla = {
    "datosFiltro": [
        {
            "tabla": "plan",
            "columna": "Cod_Req",
            "operacion": "=",
            "comparador": traza_req,
            "siguienteOperacion": null
        }
    ]
}
const recopPlanilla = new RecopiladorDatos(planilla_columnasTodas,tablaMadrePlanilla,null,detJSONPlanilla)
const tablaPlanilla = TablaVistaFabrica.crear(recopPlanilla);


// Productos ofrecidos
const detJSONProdEncontrados = {
    "datosFiltro": [
            {
                "tabla": "plan",
                "columna": "Cod_Req",
                "operacion": "=",
                "comparador": traza_req,
                "siguienteOperacion": null
            }],
    "tablaJoins": [
        {
            "nombreTablaIzquierda":"planilla",
            "nombreTablaIzquierdaAlias":"plan",
            "nombreTablaDerecha":"pOfe",
            "tipoRelacion":"LEFT",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Producto_Solicitado"
        },
        {
            "nombreTablaIzquierda":"cotizaciones_proveedores",
            "nombreTablaIzquierdaAlias":"ofer",
            "nombreTablaDerecha":"pOfe",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Cotizacion"
        },
        {
            "nombreTablaIzquierda":"contactos",
            "nombreTablaIzquierdaAlias":"cont",
            "nombreTablaDerecha":"ofer",
            "tipoRelacion":"INNER",
            "campoIzquierda":"TRAZA",
            "campoDerecha":"Contacto_proveedor"
        },
    ]
    
};
const columnasProdEncontrados = [
    ...prodOferta_columnasCasiTodas, 
    planilla_codReq, 
    planilla_grupo,
    planilla_productoSolicitado, 
    ofertas_moneda, 
    contacto_empresa, 
];
const recopProdEncontrados = new RecopiladorDatos(columnasProdEncontrados,tablaMadreProdOfertas,null,detJSONProdEncontrados);
const tablaConfigProdEncontrados = {rowSelection: { mode: 'multiRow' }}

const tablaProdEncontrados = TablaVistaFabrica.crear(recopProdEncontrados,true,tablaConfigProdEncontrados);



document.addEventListener("DOMContentLoaded", async function () {
    await informeInfo.renderizar('inforReq');
    tablaPlanilla.renderizar('tblProductosSolicitados');
    await tablaProdEncontrados.renderizar('tblProductosOfrecidos'); 


    // Calcular progreso
    const prodPedidos = tablaProdEncontrados.obtenerValoresTodasFilas(prodOferta_productoSolicitado.nombre);
    const prodEncontrados = tablaPlanilla.obtenerValoresTodasFilas(planilla_productoSolicitado.nombre);
    const ratio = prodEncontrados.size / prodPedidos.size;
    llenarBarraProgreso(ratio);
   

    // Crear ofertas dinamicamente despues de cargar los datos
    const valoresComparacion = Array.from(
        tablaProdEncontrados.obtenerValoresTodasFilas(prodOferta_oferta.nombre), 
        String
    );

    const comparadorEnFormatoSQL = `('${valoresComparacion.join("','")}')`;

    const detJSONOfertas = {
        datosFiltro: [
            {
                tabla: tablaMadreOfertas.alias,
                columna: "TRAZA",
                operacion: "IN",
                comparador: comparadorEnFormatoSQL,  // Usar la cadena generada
                siguienteOperacion: null
            }
        ]
    };

    const recopOfertas = new RecopiladorDatos(ofertas_columnasTodas, tablaMadreOfertas,null,detJSONOfertas)
    const tablaOfertas = TablaVistaFabrica.crear(recopOfertas);

    tablaOfertas.renderizar('tblOfertas');


});


function llenarBarraProgreso(ratio){
    const porcentaje = ratio * 100;
    const barraProgreso = document.querySelector('.progress-bar');
    barraProgreso.style.width = porcentaje + '%';
    barraProgreso.setAttribute('aria-valuenow', porcentaje);
    barraProgreso.textContent = porcentaje + '%';
}

