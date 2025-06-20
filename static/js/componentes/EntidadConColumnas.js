// No estoy seguira lo que hace esta clase toavia. Es para los comportamientos parecidos de tablas e informes, especlmente para la actualizacion de datos. Quiero trater de limpiar un poco tabla vista y poner lo que se pueda aqui

export class EntidadConColumnas {

    constructor(recopilador){

        this.recopilador = recopilador;
        this.columnas = recopilador.columnas;

        this.eventDispatcher = new EventTarget();
        this.dependeDeOtraTabla = false;
    }

    actualizarData(){
        throw new Error('Este metodo tiene que ser sobreescrito por las hijas');
    }

};
