import { generarCadenaAleatoria } from "../../fabricas/TablaVistaFabrica.js";
import { mostrarElementos, ocultarElementos } from "../../utils/componentes_utils.js";
import { cerrarModales } from "../Modal.js";
import { eliminarMensajeTemporal } from "../Validador.js";
import { Informe } from "./BaseInforme.js";

export class Formulario extends Informe {

    constructor(recopilador, config = {}) {
        super(recopilador, config);
    

        this._botonesUI = this._crearBotones();

        this._configurarColumnasEstaticas();

        this.actualizarAModo(config?.modo ?? 'vista');
        

    }

    _configurarColumnasEstaticas(){
        const personalizadas = this._config?.columnasEstaticas ?? [];
        const dependencia = this.recopilador.columnaDependienteDeOtraTabla;

        if (!dependencia){
            this._columnasEstaticas = personalizadas;
            return;
        }

        const columnasCombinadas =[...personalizadas, dependencia];

        const columnasUnicas = new Map();
        columnasCombinadas.forEach(col => {
            columnasUnicas.set(col.nombreUnico, col);
        });
    
        this._columnasEstaticas = Array.from(columnasUnicas.values());
    }

    _crearBotones() {


        return {
            btnGuardar: this._crearBoton( 
                "Guardar", 
                ["btn", "btn-success", "guardar-btn"],
                () => this._guardarData()),
            btnCancelar: this._crearBoton(
                "Cancelar", 
                ["btn", "btn-danger", "cancelar-btn"],
                () => this._cancelarEdicion()),

            btnEditar: this._crearBoton(
                "Editar", 
                ["btn", "btn-primary", "editar-btn"],
                () => this._editarFormulario())
        };
    }

    
    _crearBoton(texto, clases, evento) {
        const boton = document.createElement("button");
        boton.classList.add(...clases);
        boton.innerText = texto;
        boton.addEventListener("click", evento);
        
        return boton;
    }
    
    _cancelarEdicion(){
        this._finAccionBotones('Cancelar')
        this.columnas.forEach(col => col.restaurarValorOriginal());

        
    }

    _editarFormulario(){
        this._finAccionBotones('Editar')
        eliminarMensajeTemporal();
    }

    async _accionesDespuesDeGuardar({ columnasAGuardar, tipo, traza }) {
        if (this._tablaConectada) this._actualizarTabla(tipo);
    
        if (tipo === 'nuevo') {
            this._actualizarColumnaTraza(traza);
            cerrarModales();
        }
    
        columnasAGuardar.forEach(columna => {
            columna.actualizarBackup();
        });

        this._finAccionBotones('Guardar', traza);
    }
    
    _actualizarTabla(tipo) {
        tipo === 'actualizacion'
            ? this._tablaConectada.actualizadFila(this._filaEnEdicion, this.columnas)
            : this._tablaConectada.actualizarData();
    }

    _actualizarColumnaTraza(traza) {
        const columnaTRAZA = this.columnas.find(col => col.nombreEnBD === 'TRAZA');
        if (columnaTRAZA) {
            columnaTRAZA.valor = traza;
        }
    }



    _finAccionBotones(boton, data = null) {
        const accionPersonalizada = this._config?.accionBotones?.[boton];
    
        if (typeof accionPersonalizada === "function") {
            return accionPersonalizada(data);       
        }
    
        this._manejarAccionPorDefecto(boton);
    }

    _manejarAccionPorDefecto(boton) {
        switch (boton) {
            case 'Guardar':
            case 'Cancelar':
                this.actualizarAModo('vista');
                break;
    
            case 'Editar':
                this.actualizarAModo('edicion');
                break;
    
            default:
                console.warn(`Botón "${boton}" no tiene acción definida en la clase Formulario.`);
                break;
        }
    }
        
    
    actualizarAModo(modo) {
        this.modo = modo;
        this.columnas.forEach(col =>  this._cambiarModoColumnas(col));
        this._mostrarBotones();
    }

    _cambiarModoColumnas(columna){
        let modo = 'vista';
        if (this._pertenceAMismaMadre(columna) && !this._esUnaColumnaEstatica(columna)){
            modo = this.modo;
        }
        columna.cambiarAModo(modo, this.modalID);
    }
    _esUnaColumnaEstatica(columna){
        if (this._columnasEstaticas){
            return this._columnasEstaticas.some(col => col.nombreUnico === columna.nombreUnico);
        }
        return false;
    }
    _pertenceAMismaMadre(columna){
        return columna.nombreTablaMadreCompleto == this.nombreTablaOrigenCompleto;
    }

    _verificarModo(modo) {
        if (modo !== "vista" && modo !== "edicion") {
            throw new Error(`Modo inválido: ${modo}. Debe ser 'vista' o 'edicion'.`);
        }
    }
    

    _mostrarBotones() {
        if (this.modo==='vista'){
            this._mostrarBotonesVista()
        }
        else if(this.modo === 'edicion'){
            this._mostrarBotonesEdicion()
        }
    }

    _mostrarBotonesEdicion() {
        mostrarElementos([this._botonesUI.btnGuardar, this._botonesUI.btnCancelar]);
        ocultarElementos([this._botonesUI.btnEditar]);
    }
    

    _mostrarBotonesVista() {
        ocultarElementos([this._botonesUI.btnGuardar, this._botonesUI.btnCancelar]);
        mostrarElementos([this._botonesUI.btnEditar]);
    }

    async renderizar(idCuerpo, idBotones){
        await super.renderizar(idCuerpo);
        this._idBotones = idBotones;
        this._renderizarBotones(idBotones)
    }

    get idBotones(){
        if (!this._idBotones){
            this._idBotones = generarCadenaAleatoria();
        }
        return this._idBotones;
    }

    _renderizarBotones(idBotones) {
        const contenedor = document.getElementById(idBotones);
        if (contenedor) {
            contenedor.replaceChildren(...Object.values(this._botonesUI));
        }
        else {
            console.warn(`El contenedor con id '${idBotones}' no fue encontrado.`);
        }
    }

    get botones() {
        return Object.values(this._botonesUI); 
    }

    actualizarValorColumna(columna, valor){
        const columnaActualizar =  this.columnas.find(col => col.nombreUnico === columna.nombreUnico);
        columnaActualizar.valor = valor;
    }
    
}    



