import { Informe } from "../componentes/informe/BaseInforme.js";
import { Formulario } from "../componentes/informe/Formulario.js";

// Esto se utiliza para poder conectar las tablas de dependencias. Cuando se crea un formulario o informe que dependa de una tabla, si no se pude crear directamente
export class InformeFormularioFabrica {
    static crear(recopilador, modoInicialFormulario = null) {

        let nuevoInforme;

        if (modoInicialFormulario){
            nuevoInforme = new Formulario(recopilador,modoInicialFormulario);
        }
        else{
            nuevoInforme = new Informe(recopilador);
        }
     
        

        if (recopilador.tablaDeDependencia){
            const { tablaReferencia, dependiente } = recopilador.tablaDeDependencia;
            tablaReferencia.conectarTabla(nuevoInforme,dependiente);
        }

        return nuevoInforme;
    }
  }
  
  