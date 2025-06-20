import { mostrarElementos, obtenerElementoPorId, ocultarElementos } from "../utils/componentes_utils.js";
import { buscarTextoEnCacheReferencias, convertirALista } from "../utils/referencias_utils.js";


export class Columna {

    constructor(dataColumna, tablaConfig = null) {

        this._validarColumnas(dataColumna);
        
        this.tablaMadreEnBD = dataColumna.tablaMadreEnBD; //Esto es una estructura
        this.nombreEnBD = dataColumna.nombreEnBD ; 
        this._nombre = dataColumna.nombre;
        this.nombreUI = dataColumna.nombreUI;
        this.tipo = dataColumna.tipo;
        this._obligatorio = dataColumna.obligatorio;
        this._valoresSelect2 = dataColumna.valoresSelect2?? null;
        this._valorPredeterminado = dataColumna.valorPredeterminado;

        this.formato = dataColumna.formato ?? null;

        this._valor = "";
        this._modo = null;

        this._nodoHTML = null; 
        this._nodoVista = null;
        this._nodoEdicion = null;

        this._tablaConfig = tablaConfig;

    }
    set valorPredeterminado(nuevoValor){
        this._valorPredeterminado = nuevoValor;
    }

    set valoresSelect2(valores){
        this._valoresSelect2 = valores;
    }
    get nombre(){
        return this.nombreUnico;
    }

    get esObligatoria(){
        return this._obligatorio?? false
    }

    _validarColumnas(dataColumna){
        const requiredFields = ["tablaMadreEnBD", "nombreEnBD", "nombre", "nombreUI", "tipo"];
        requiredFields.forEach(field => {
            if (!dataColumna || !(field in dataColumna)) {
                throw new Error(`Falta el campo requerido: ${field}`);
            }
        });
    }

    // Metodos para tablas

    _esColumnaDeEdiciones(){
        return this._nombre =='ediciones'
    }


    get formatoTabla() {

        if (this._esColumnaDeEdiciones()){
            return;
        }

        let columnaFormato = {
            headerName: this.nombreUI,
            field: this.nombre,
            ...this._tablaConfig
        };
    
        columnaFormato = this._agregarFormatoCeldas(columnaFormato);

        return columnaFormato;
    }
    

    _agregarFormatoCeldas(columnaFormato) {
        if (this.tipo == 'boolean') {
            return this._agregarFormatoBoolean(columnaFormato);
        }
        else if (this.tipo == 'file'){
            return this._agregarFormatoFile(columnaFormato);
        }

        else if (!this.formato) {
            return columnaFormato;  
        }
    
        else if (this._esFormatoSelect2()) {
            return this._agregarFormatoDependienteColumna(columnaFormato);
        }
    
        else if (this._esDiccionarioSimple(this.formato)) {
            return this._agregarFormatoDiccionarioSimple(columnaFormato);
        }

        console.log('Formato de columna no reconocido', this.formato);
        return columnaFormato;
    }

    _esDiccionarioSimple(obj) {
        return obj !== null && typeof obj === 'object' && 
               Object.getPrototypeOf(obj) === Object.prototype;
    }
    
    _agregarFormatoDiccionarioSimple(columnaFormato){
        return {
            ...columnaFormato,
            valueFormatter: (params) => this._diccionarioAHumano(params), 
            filterParams: {
                valueFormatter: (params) => this._diccionarioAHumano(params)
              
            }
        }
    }

    _diccionarioAHumano(params) {
        return this.formato[params.value] || params.value;
    }


    _agregarFormatoBoolean(columnaFormato){
        return {
            ...columnaFormato,
            valueFormatter: (params) => this._booleanoAHumano(params), 
            filterParams: {
                valueFormatter: (params) => this._booleanoAHumano(params)
              
            }
        };
    }

    _booleanoAHumano(params){
        return params.value === 1 ? 'Sí' : params.value === 0 ? 'No' : params.value;
    }

    _agregarFormatoFile(columnaFormato){
        return {
            ...columnaFormato,
            
            cellRenderer: (params) => {
                if (params.value !== ""){
                    const anchor = this._crearLink();
                    this._configurarEnlace(anchor, params.value);
                    return anchor;
                } 
            }
       }
    }
    
    

    _agregarFormatoDependienteColumna(columnaFormato) {
        this.contextoTabla = {formato: this._convertirFormatoADiccionarios(this.formato)};
        
        return {
            ...columnaFormato,
            valueFormatter: (params) => this._columnaAHumano(params)
            // filter params no funciona con esta implementacion :(
        };
    }

    _columnaAHumano(params){ 

        try {
            const value = params?.value ?? '';
            const formato = params?.context?.[this?.nombre]?.formato;
            
            return formato 
                ? buscarTextoEnCacheReferencias(formato, value) ?? value
                : value;
        } catch {
            return params?.value ?? '';
        }
    }

   
    _convertirFormatoADiccionarios(formatoColumnas) {
 
        const listaColumnasReferencias = convertirALista(formatoColumnas);
        let resultado = [];
    
        for (const columnaReferencia of listaColumnasReferencias) {
            resultado.push (this._convertirColumnaADiccionario(columnaReferencia));
        }
    
        return resultado;
    }

   
    _convertirColumnaADiccionario(columnaInicial) {
        if (!(columnaInicial instanceof Columna)) {
            return columnaInicial; // Es un texto, no una columna
        }
    
        const diccionarioResultante = {};
        let diccionarioActual = diccionarioResultante;
        let columnaActual = columnaInicial;
    
        while (columnaActual instanceof Columna) {
            diccionarioActual.nombreUnico = columnaActual.nombreUnico;
            
            if (columnaActual.formato instanceof Columna) {
                diccionarioActual.formato = {};
                diccionarioActual = diccionarioActual.formato;
                columnaActual = columnaActual.formato;
            } else {
                if (columnaActual.formato) {
                    diccionarioActual.formato = columnaActual.formato; // Si es un valor primitivo, lo asignamos
                }
                break;
            }
        }
    
        return diccionarioResultante;
    }
    

    get nombreTablaMadre(){
        if (this.tablaMadreEnBD){
            return this.tablaMadreEnBD.alias;
        }
    }

    get nombreTablaMadreCompleto(){
        if (this.tablaMadreEnBD){
            return this.tablaMadreEnBD.nombre;
    
        }    
    }

    get nombreOriginal(){
        return this._nombre;
    }

    get nombreUnico(){
        if (this.tablaMadreEnBD){
            return `${this.nombreTablaMadre}_${this._nombre}`;
        }
        else {
            return this._nombre;
        }
        
    }

    
    // Metodos para informe/formulario
    crearHTML(modo, modalID = null) {

        if (this._esColumnaDeEdiciones()){
            return;
        }

        modo = this._validarModo(modo);
        this._modo = modo;

        if (this._nodoHTML === null) {
            this._nodoHTML = this._crearNodoGeneral();
        }

        this._mostrarNodo(modalID);

        return this._nodoHTML;
    }

    _validarModo(modo) {
        if (modo !== 'vista' && modo !== 'edicion') {
            throw new Error("El modo de HTML ingresado es incorrecto");
        }
        return this.nombreEnBD === 'TRAZA' ? 'vista' : modo;
    }
    

    _crearNodoGeneral() {
        let nodo = document.createElement("div");
        nodo.classList.add("info-detail");

        const etiqueta = this._obtenerEtiqueta()
        nodo.appendChild(etiqueta);
        
        return nodo;
    }

    _obtenerEtiqueta(){

        const etiqueta = document.createElement("h6");
        etiqueta.textContent = this.nombreUI;

        if (this.esObligatoria){
            const obligatorio = document.createElement("span");
            obligatorio.textContent = "*";
            obligatorio.style.color = "red";
            etiqueta.appendChild(obligatorio);
        }

        return etiqueta;
    }

    _mostrarNodo(modalID){

        let nodoMostrar;
        let nodoOcultar;

        if (this._modo === 'vista') {

            if (!this._nodoVista){
                this._crearNodoVista();
            }

            nodoMostrar = this._nodoVista;
            nodoOcultar = this._nodoEdicion ?? null;
        }
        else{

            if (!this._nodoEdicion){
                this._crearNodoEdicion(modalID);
            }

            nodoMostrar = this._nodoEdicion;
            nodoOcultar = this._nodoVista ?? null;
        }
        
        if (document.readyState ==='complete'){
            this._llenarValoresEnNodo();

            mostrarElementos([nodoMostrar]);
            if (nodoOcultar){
                ocultarElementos([nodoOcultar]);
            }
        }
        
    }

    _crearNodoVista() {
        let parrafo;
    
        if (this.tipo === 'file') {
            parrafo = this._crearLink();  
        } else {
            parrafo = document.createElement("p");  
        }

        this._nodoVista = parrafo;

        this._nodoHTML.appendChild(this._nodoVista);
    }
    
    
    _crearLink(){
        return document.createElement('a');
    }


    cambiarAModo(modo, modalID = null) {
        if (this._esColumnaDeEdiciones()){
            return;
        }
        
        modo = this._validarModo(modo);

        this._modo = modo;


        this._mostrarNodo(modalID);

        this._nodoEdicion?.classList.remove("div-faltante");
        this._nodoVista?.classList.remove("div-faltante");

    }

   
    restaurarValorOriginal(){
        this._valor = this._valorBackup;
        this._llenarValoresEnNodo();
    }

    
    get valor(){
        return this._valor;
    }

    get valorConTipo(){

        if (this.tipo === 'TRAZA' || this.tipo === 'int'){
            return parseInt(this._valor, 10);
        }
        return this._valor;
    }

    get valorVacio() {
        const date = new Date();
        
        if (this.tipo === 'date') {
            return date.toISOString().split('T')[0]; // "yyyy-MM-dd"
        }
        
        if (this.tipo === 'datetime') {
            // Restar 5 horas para ajustar a la hora de Perú (UTC-5)
            date.setHours(date.getHours() - 5);
    
            const formattedDate = date.toISOString().slice(0, 16); // "yyyy-MM-ddThh:mm"
            return formattedDate;
        }

        if (this._valorPredeterminado){
            return this._valorPredeterminado;
        }
    
        return null;
    }
    
    

    actualizarBackup(){
        this._valorBackup = this._valor;
    }

    set valor(nuevoValor) {
        this._valor = nuevoValor;
        this._valorBackup = nuevoValor;
    
        this._llenarValoresEnNodo();
    }

    set valorNuevo(nuevoValor){
        this._valor = nuevoValor;

    }

    get cambioEnData(){
       return this._valorBackup !== this._valor;
    }


    _llenarValoresEnNodo(){
        if (this._nodoVista!==null && this._modo === 'vista') {
            this._llenarNodoVista();
        }

        if (this._nodoEdicion && this._modo === 'edicion') {
            this._llenarNodoEdicion();
        }
    }

    _llenarNodoVista(){

        if (this._valor === null){
            return;
        }
          
        if (this.tipo === 'file') {
            this._convertirNodoEnEnlace();
        }
        else if(this.tipo === 'boolean'){
            this._llenarNodoVistaBoolean();
        }
        else if(this.formato){
            this._llenarNodoVistaConFormato();
        }
        else{
            this._llenarTextoNodo();
        }

    }
    
    _convertirNodoEnEnlace() {
        if (this._valor !== null || this._valor !== "") {
            this._configurarEnlace(this._nodoVista, this._valor);
        }
        
    }
    
    _configurarEnlace(enlace, ubicacionArchivo) {
        let enlaceArchivo;

        if (ubicacionArchivo.startsWith('File')) {
            enlaceArchivo = ubicacionArchivo;
        } else if (ubicacionArchivo.startsWith('FIGAppV2')) {
            enlaceArchivo = 'https://drive.google.com/drive/folders/1jPnM3fEwMqXoKDH119Ja3QA4d_m3tgq3?usp=sharing';
        } else {
            enlaceArchivo = ubicacionArchivo;
        }

        
        Object.assign(enlace, {
            href: enlaceArchivo,
            target: '_blank',
            innerText: ubicacionArchivo || '',
        });
    }
  
    
    _llenarNodoVistaBoolean() {
        this._nodoVista.textContent = (this._valor === 1 || this._valor === '1' || this._valor === true) ? 'Si' : 'No';
    }
    

    _llenarNodoVistaConFormato(){

        if (this._esDiccionarioSimple(this.formato)) {
            this._nodoVista.textContent =  this.formato[this._valor] || this._valor;
        } else if (this._esFormatoSelect2()) {
            this._nodoVista.textContent =  buscarTextoEnCacheReferencias(this.formato, this._valor) || this._valor;
        }
    }
        
    _llenarTextoNodo() {
        this._nodoVista.textContent = this._valor ?? "";
    }
    
        
    
    
    
    _crearNodoEdicion(modalID) {

        let nodoEdicion;

        if (this._esFormatoSelect2()){
            nodoEdicion =  this._crearSelect2DesdeColumna(modalID);
        }
        else if (this._esDiccionarioSimple(this.formato)) {
            nodoEdicion =  this._crearSelectDesdeDiccionario(this.formato);
        }

        else {
            const configuracionesInput = {
                boolean: { tipo: "checkbox", obtenerValor: (e) => e.target.checked ? 1 : 0},
                file: { tipo: "file", obtenerValor: (e) => e.target.files[0] },
                date: { tipo: "date", obtenerValor: (e) => e.target.value },
                datetime: { tipo: "datetime-local", obtenerValor: (e) => e.target.value },
                varchar: { tipo: "text", obtenerValor: (e) => e.target.value },
                text: { tipo: "textarea", obtenerValor: (e) => e.target.value },
            };
        
            const configuracion = configuracionesInput[this.tipo] || configuracionesInput["varchar"];
            nodoEdicion =  this.crearInputGenerico(configuracion);
        }
        
        this._nodoEdicion = nodoEdicion;
    }
    
    crearInputGenerico(configuracion) {
        let input;
    
        if (configuracion.tipo === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = configuracion.tipo;
        }
    
        if (configuracion.obtenerValor) {
            input.addEventListener("change", (e) => {
                this._valor = configuracion.obtenerValor(e); 
                this._llenarValoresEnNodo();
            });
        }
    
        this._nodoHTML.appendChild(input);    
        return input;
    }
    

    _crearSelectDesdeDiccionario(diccionario) {
        const select = document.createElement("select");

        for (const clave in diccionario) {
            const opcion = document.createElement("option");
            opcion.value = clave;  
            opcion.textContent = diccionario[clave];  
            select.appendChild(opcion);
        }
    
        // esto es repetitivo con crearInputGenerico
        select.addEventListener("change", (e) => {
            this._valor = e.target.value;  
            this._llenarValoresEnNodo();
        });
    
        this._nodoHTML.appendChild(select);
        return select;
    }

    _crearSelect2DesdeColumna(modalID) {
        const select = document.createElement("select");
        select.id = `${this.nombreUnico}_select2`;
            

        const selectWrapper = document.createElement('div');
        selectWrapper.appendChild(select);

        this._nodoHTML.appendChild(selectWrapper);


        this._esperarOInicializarSelect2(modalID);        

        return selectWrapper;
    }

    _esperarOInicializarSelect2(modalID){
        if (document.readyState !=='complete') {
            document.addEventListener('incializacionTerminada', (event) => {
                this._inicializarSelect2(modalID);
            });
            
        } else {
            this._inicializarSelect2(modalID);
        }        
    }
    _inicializarSelect2(modalID){

        if (!this._esFormatoSelect2() || this._modo === 'vista') {
            return;
        }
        
        let opcionesSelect2 = this._crearOpcionesSelect2();
        if (modalID) {
            opcionesSelect2.dropdownParent = $(`#${modalID}`);
        }
        
        const selectId = `${this.nombreUnico}_select2`;
        const selectDOM = obtenerElementoPorId(selectId);

        $(`#${selectDOM.id}`).select2(opcionesSelect2);
        $(`#${selectDOM.id}`).val(this._valor === "" ? null : this._valor).trigger('change');
        
        $(`#${selectDOM.id}`).on('select2:select', (e) => {
            const data = e.params.data;
            this._valor = data.id;  
        });

        $(`#${selectDOM.id}`).on('select2:clear', (e) => {
            this._valor = null;  
        });
    }

    _esFormatoSelect2(){
        return this.formato !== null && (this.formato instanceof Columna || (Array.isArray(this.formato) && this.formato.length > 0)) ;
    }

    _crearOpcionesSelect2(){

        // en vez de css
        const opcionesSelect2 = {
            placeholder: "Selecciona una opción",
            data: this._conseguirDiccionarioDeReferencias(),
            width: '100%',
            allowClear: true,
        };

        return opcionesSelect2;
    }

    _conseguirDiccionarioDeReferencias(){
        
        let columnaReferencia;
        if (Array.isArray(this.formato)){
            columnaReferencia  = this.formato.find(item => item instanceof Columna);
        }
        else{
            columnaReferencia = this.formato;
        }

        let valoresBuscados;
        if (this._valoresSelect2){
            valoresBuscados = this._valoresSelect2;
        }
        else{
            const cache = window.cacheReferencias || {};
            const cacheReferencia = cache[columnaReferencia.nombreUnico]|| {};
            valoresBuscados= Object.keys(cacheReferencia);
        }
        

        const opciones = valoresBuscados.map(valor => ({
            id: valor,
            text: buscarTextoEnCacheReferencias(this.formato, valor)
        }));
        
        
        return opciones;
    }
    
    _llenarNodoEdicion() {
        const input = this._nodoEdicion;
        
        switch (input.type) {
            case "checkbox":
                input.checked = Boolean(this._valor);
                break;
    
            case "file":
                this._llenarInputArchivo(input);                
                break;
    
            default:  // Manejar "text", "date", "datetime-local" y otros casos
                input.value = this._valor || "";
        }

        if (this._esFormatoSelect2()){
            const selectId = `${this.nombreUnico}_select2`;
            const selectDOM = obtenerElementoPorId(selectId);
            $(`#${selectDOM.id}`).val(this._valor === "" ? null : this._valor).trigger('change');

        }
    }

    
    _llenarInputArchivo(input) {
        if (this._valor instanceof File) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(this._valor);  // Crear lista de archivos con el archivo
            input.files = dataTransfer.files;    // Asignar la lista de archivos al input tipo file
        } else {
            console.warn("El valor asignado no es un archivo válido");
        }
    }
}

// Funciones que podrian estar en otra parte

// esta funcion es para que losarchivos carguen desde la base de datos y se uestren en el formulario
function precargarArchivoEnInput(url, nombre = 'archivo.pdf') {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const archivo = new File([blob], nombre, { type: blob.type });
        const transfer = new DataTransfer();
        transfer.items.add(archivo);
        document.querySelector('#inputArchivo').files = transfer.files;
      })
      .catch(err => console.error('Error al precargar archivo:', err));
  }
  

