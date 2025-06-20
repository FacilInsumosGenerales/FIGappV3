import { Formulario } from "../componentes/informe/Formulario.js";
import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { contacto_columnasTodas, contacto_empresa, contacto_traza, tablaMadreContactos } from "../modelos/Contactos.js";
import { datosGenerales_adjuntos, datosGenerales_contactoCliente, datosGenerales_estado, datosGenerales_fechaRegistro, datosGenerales_lugarEntrega, datosGenerales_nombreProducto, datosGenerales_prioridad, datosGenerales_traza, tablaMadreDatosGenerales } from "../modelos/DatosGenerales.js";
import { empresa_cliente, empresa_columnasTodas, empresa_traza, tablaMadreEmpresas } from "../modelos/Empresas.js";
import { alertaFinalInicializacion } from "../utils/componentes_utils.js";


const detallesJSON_Empresa = {
    "datosFiltro": [
                {
                    "tabla": tablaMadreEmpresas.alias,
                    "columna": empresa_cliente.nombreEnBD,
                    "operacion": "=",
                    "comparador": '1', // Empresas que sean clientes
                    "siguienteOperacion": null
                }
            ],
};
const recop_Empresa = new RecopiladorDatos(empresa_columnasTodas, tablaMadreEmpresas,{},detallesJSON_Empresa);
const tabla_Empresa = TablaVistaFabrica.crear(recop_Empresa,{btnNuevo: 'btnNuevaEmpresa'} );





const columnas_Req =[
    datosGenerales_nombreProducto,
    datosGenerales_prioridad,
    datosGenerales_contactoCliente,
    datosGenerales_fechaRegistro,
    datosGenerales_estado,
    datosGenerales_lugarEntrega,
    datosGenerales_adjuntos,
    datosGenerales_traza
];

const recop_Req = new RecopiladorDatos(columnas_Req, tablaMadreDatosGenerales, null, null, {datosNuevos:true});

function irARegistrado(traza){
    const url = `ReqRegistrado.html?traza=${encodeURIComponent(traza)}`;
    window.location.href = url;
}
function regresarAComercial(){
    const url = `../Comercial.html`;
    window.location.href = url;
}

const formularioCofig_Req = {
    modo:'edicion',
    columnasEstaticas:[datosGenerales_contactoCliente],
    accionBotones: {
        "Guardar": irARegistrado,
        "Cancelar": regresarAComercial
    }
};
const formulario_Req = new Formulario(recop_Req, formularioCofig_Req);



const conector_Contacto = {
    tablaMadre: 
    {
        columnaLocal: contacto_empresa,
        tablaReferencia: tabla_Empresa,
        columnaReferencia: empresa_traza
    }
}
const recop_Contacto = new RecopiladorDatos(contacto_columnasTodas,tablaMadreContactos,conector_Contacto);
const tablaConfig_Contacto =  {
    rowSelection: {
        mode: 'singleRow',
    },
    onRowSelected: (event) => {
        console.log(event);
        const dataDeFila = event?.data ?? {};
        const nombreDeColumna = contacto_traza.nombreUnico;
        const dataColumna = dataDeFila[nombreDeColumna];
        formulario_Req.actualizarValorColumna(datosGenerales_contactoCliente, dataColumna);
    }
};
const tabla_Contacto = TablaVistaFabrica.crear(recop_Contacto,{btnNuevo: 'btnNuevoContacto'} ,tablaConfig_Contacto);



$(document).ready(async function(){
    
    await tabla_Empresa.renderizar("tblEmpresa");
    tabla_Contacto.renderizar('tblContacto')

    await formulario_Req.renderizar('formularioRequerimiento', 'botones');

    alertaFinalInicializacion(); // necesario select 2 en formularios. Quiza se pueda poner dentro de renderizar formulario?
});