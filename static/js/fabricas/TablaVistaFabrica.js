import { Formulario } from "../componentes/informe/Formulario.js";
import { Modal } from "../componentes/Modal.js";
import { TablaVista } from "../componentes/TablaVista.js";
import { obtenerElementoPorId } from "../utils/componentes_utils.js";

export class TablaVistaFabrica {
    static crear(recopilador, abrirModalConfig = {abrir: true}, tablaConfig = {}) {

        let formulario;
        if (abrirModalConfig.abrir || abrirModalConfig.btnNuevo){

			({formulario, tablaConfig} = configurarFormularioParaTabla(recopilador,abrirModalConfig,tablaConfig));
        }
		
      	const nuevaTabla=  new TablaVista(recopilador, tablaConfig);

        if (formulario){
            formulario.tablaConectada = nuevaTabla;
        }   
        
        conectarTablaDeDependencia(recopilador,nuevaTabla);

		return nuevaTabla;
    }
}



function configurarFormularioParaTabla(recopilador,abrirModalConfig,tablaConfig){
    const  config = {modalID:generarCadenaAleatoria()};

    const formulario = new Formulario(recopilador,config);
    const modal = new Modal(formulario);

    tablaConfig = {
        ...tablaConfig,
        onRowDoubleClicked: (event) => modal.abrir(event),
    };

    if (abrirModalConfig.btnNuevo){
        document.addEventListener("DOMContentLoaded", () => {
            configurarBotonNuevoElemento(abrirModalConfig,modal);
        });
    }

    return {formulario, tablaConfig};
}

function conectarTablaDeDependencia(recopilador,nuevaTabla){

    if (recopilador.tablaDeDependencia){
        // COnectar la tabla dependiente para que cuando la tabla madre cambie esta tambien se actualice
        const { tablaReferencia, dependiente } = recopilador.tablaDeDependencia;
        tablaReferencia.conectarTabla(nuevaTabla,dependiente);
    }
}
 
function configurarBotonNuevoElemento(abrirModalConfig,modal){
    const btn = obtenerElementoPorId(abrirModalConfig.btnNuevo); 
    btn.addEventListener("click", () => modal.abrir());

}

 
  
export function generarCadenaAleatoria() {
    return Math.random().toString(36).substring(2, 8);
}