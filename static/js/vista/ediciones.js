import { actualizarData, obtenerData } from "../controladores/api.js";
import { flechaAbajo, flechaArriba, JSONEdicion, mapaTitulosPorTabla } from "../data/ediciones_data.js";
import { reemplazarComasPorPuntos } from "../utils/component_utils.js";
import { mostrarElementos, ocultarElementos } from "../utils/componentes_utils.js";
import { formatearFechaComoYYMMDD, formatearFechaDependiendoDelDia } from "../utils/date_utils.js";

// la actual version pierde los comentarios sobre los otros temas cuando actualiza
class EdicionDetalle {

    constructor(ediciones, nombreElemento){
        this.edicionesHistorial=ediciones;
        this.nombreElemento = nombreElemento;
    }

    get resumenUI(){
        if (!this._resumenElemento) { 
            const liMensaje = document.createElement("li");
            liMensaje.innerHTML = this._generarResumen();

            this._resumenElemento = liMensaje;
        }
        return this._resumenElemento;
    }

    _generarResumen(){
        let nombreElementoCorto = this._cortarString(this.nombreElemento,10);
        const edicion = this.ultimaEdicion;
        let mensajeCorto = this._cortarString(edicion.ultimoMensaje,35);

        return `<a class="d-flex flex-column justify-content-between p-3 chatPreview" href="#">
                    <p class="fw-bold mb-0">${nombreElementoCorto}</p>
                    <p class="text-muted small mb-1">${edicion.ultimaFecha}</p>
                    <p class="text-muted small"><strong>${edicion.ultimoUsuario}</strong><span> ${mensajeCorto}</span></p>
                </a>`;
    }

    get ultimaEdicion(){

        if (!this.edicionesHistorial){
            return {"ultimoUsuario":'Ningun usuario', "ultimoMensaje": 'Ningun mensaje o edición creado', "ultimaFecha":'Sin fecha'};
        }
        const ediciones = this.edicionesHistorial.split(";");
        const ultimaEdicion = (ediciones[ediciones.length - 1]).trim();
    
        var ultimaFecha = ultimaEdicion.split(",")[0];
        ultimaFecha = formatearFechaDependiendoDelDia(ultimaFecha,false);
        const ultimoUsuario = ultimaEdicion.split(",")[1];
        const ultimoMensaje = ultimaEdicion.split(",")[2]; 

        return {"ultimoUsuario":ultimoUsuario, "ultimoMensaje": ultimoMensaje, "ultimaFecha":ultimaFecha};
    }

    llenarChat(){
        
        var historialTitulo = document.getElementById("historialTitulo");
        historialTitulo.textContent = this._cortarString(this.nombreElemento,35);

        let contenidoHistorial = document.getElementById("historial");
        contenidoHistorial.innerHTML = '';

        const ediciones = this.edicionesHistorial.split(";");
        ediciones.forEach(edicion =>{
            contenidoHistorial.insertAdjacentHTML('beforeend', this._convertirFormatoChat(edicion));
        });
    }

    actualizarInstancia(nuevaData){
        this.edicionesHistorial=nuevaData;
        this._resumenElemento.innerHTML = this._generarResumen();
        this.llenarChat();
    }

    _convertirFormatoChat(elementoHistorial){

        try{
            if (this._esDivisionDeGrupo(elementoHistorial)){
                return this._crearDivision(elementoHistorial);
            }
            else if (this._esComentario(elementoHistorial)) {
                return this._crearComentario(elementoHistorial);          
            } 
            else {
                return this._crearEdicion(elementoHistorial);   
            }
        }
        catch{
            console.error('Error procesando el html de ', elementoHistorial);
        }

        
    }

    _esDivisionDeGrupo(elementoHistorial) {
        return elementoHistorial.startsWith("Grupo: ");
    }
    _crearDivision(elementoDivision){
        let nombreGrupo = elementoDivision.split(':')[1];
        return `<li class="list-group-item divisionHistorial"><em>${nombreGrupo}</em></li>`;

    }

    _esComentario(elementoHistorial){
        let nombreUsuario = elementoHistorial.split(',')[1];
        return nombreUsuario.trim().endsWith(':');
    }

    _crearComentario(elementoHistorial){

        const parteLimpia = elementoHistorial.replace(/;/g,'');
        var [fecha, nombreUsuario, comentario] = parteLimpia.split(',');

        fecha = formatearFechaDependiendoDelDia(fecha);

        return`
            <li class="list-group-item usuarioComentario">
                <div class="info-even-row">
                    <h6>${nombreUsuario.trim()}</h6>
                    <span class="align-right text-muted">${fecha}</span>
                </div>
                <span>${comentario.trim()}</span>
            </li>`;
    }

    _crearEdicion(elementoHistorial){

        const parteLimpia = elementoHistorial.replace(/;/g,'');
        var [fecha, nombreUsuario, comentario] = parteLimpia.split(',');
        fecha = formatearFechaDependiendoDelDia(fecha);

        return`
            <li class="list-group-item usuarioMovimiento">
                <p>${fecha}</p>
                <p>${nombreUsuario.trim()} ${comentario.trim()}</p>
            </li>`;
    }

    _cortarString(texto, maxCaracteres) {

        if (!texto){
            return "";
        }

        if (texto.length > maxCaracteres) {
            return texto.substring(0, maxCaracteres) + '...';
        } else {
            return texto;
        }
    }
    
  
}

class EdicionGrupo{

    // this.diccEdicionesDetalle

    constructor(data,nombreTabla){
        this.diccEdicionesDetalle = {};
        this.nombreTabla= nombreTabla;
        this.generarEdiciones(data);
    }
   
    generarEdiciones(data){
        data.forEach(row => {
            let edicion = row["Ediciones"] || row["edicion"] || row["Edicion"]; 
            let nombreElemento = row[mapaTitulosPorTabla[this.nombreTabla]];
            this.diccEdicionesDetalle[row.TRAZA] = new EdicionDetalle(edicion,nombreElemento);
        });
    }
    
    

    get grupoUI() {
        const liGrupo = document.createElement("li");
        liGrupo.className = "p-0 border-bottom";
    
        const ulMensajes = this._grupoIndexUI(); 
        const divGrupo = this._grupoTituloUI(ulMensajes); 
    
        liGrupo.appendChild(divGrupo);
        liGrupo.appendChild(ulMensajes);
    
        return liGrupo;
    }
    
    _grupoIndexUI() {
        const ulMensajes = document.createElement("ul");
        ulMensajes.className = "list-unstyled";
        ulMensajes.style.display = 'none';
    

        for (const edicionTRAZA in this.diccEdicionesDetalle) {

            const edicionDetalle = this.diccEdicionesDetalle[edicionTRAZA];
            const edicionResumen = edicionDetalle.resumenUI;
            ulMensajes.appendChild(edicionResumen);

            edicionResumen.addEventListener("click", () => {

                this._mostrarChat(edicionDetalle,edicionTRAZA);
            });
            
        }
        return ulMensajes;
    }

    _mostrarChat(detalle, TRAZA){

        let historialChat = document.getElementById('historial');
        let historialVacio = document.getElementById('historialChatVacio');

        mostrarElementos([historialChat]);
        ocultarElementos([historialVacio]);
        
        let inputMensaje = document.getElementById('inputNuevoMensaje');
        inputMensaje.value = '';
        inputMensaje.dataset.tablaEdicion = this.nombreTabla;
        inputMensaje.dataset.trazaRegistro = TRAZA;

        detalle.llenarChat();
    }

    _grupoTituloUI(ulMensajes) {
        const divGrupo = document.createElement("div");
        divGrupo.className = "d-flex flex-row justify-content-between chatGroup";
        divGrupo.style.padding = "0 1rem";

        divGrupo.innerHTML = `
            <p class="fw-bold mb-0">${this.nombreTabla} (${Object.keys(this.diccEdicionesDetalle).length})</p>
            <span class="flecha">${flechaAbajo}</span>
        `;

        divGrupo.addEventListener("click", () => {
            const flechaIcon = divGrupo.querySelector('.flecha');
            this.toggleMensajes(ulMensajes,flechaIcon);
        });

        return divGrupo;
    }

    toggleMensajes(ulMensajes,flechaIcon) {
        
        ulMensajes.style.display = ulMensajes.style.display === "none" ? "block" : "none";

        if (ulMensajes.style.display === "none") {
            flechaIcon.innerHTML = flechaAbajo;
        } else {
            flechaIcon.innerHTML = flechaArriba;
        }
    }

    actualizarEdicionUnica(edicionTRAZA, nuevaData){
        const edicionDetalle = this.diccEdicionesDetalle[edicionTRAZA];
        edicionDetalle.actualizarInstancia(nuevaData);
    }

}


class EdicionesChatUI {

    // this.diccGrupos

    constructor(){
        this.diccGrupos = {};
        this.inicializarHTML();
    }

    inicializarHTML(){

        this.historialCircle = document.getElementById("historialCircle");
        this.btnCerrarHistorial = document.getElementById("btnCerrarHistorial");
        this.historialContent = document.getElementById("historialContent");
        this.chatLleno = document.getElementById("historial");
        this.chatVacio = document.getElementById("historialChatVacio");
        var btnSubmit = document.getElementById("btnHistorial");
        this.inputMensaje = document.getElementById('inputNuevoMensaje');

        this.btnCerrarHistorial.addEventListener("click", this._cerrarChat.bind(this)); 
        this.historialCircle.addEventListener("click",this._abrirChat.bind(this)); 
        btnSubmit.addEventListener("click",this._guardarMensaje.bind(this)); 

        this._cerrarChat();
    }

    _cerrarChat(){
        mostrarElementos([this.historialCircle]);
        ocultarElementos([this.historialContent]);
    }

    _abrirChat(){
        ocultarElementos([this.historialCircle]);
        mostrarElementos([this.historialContent]);
    }

    _generarIndexHTML() {
        let indiceEdiciones = document.getElementById("indiceEdiciones");
        indiceEdiciones.innerHTML = "";
    
        Object.values(this.diccGrupos).forEach((grupo) => {
            indiceEdiciones.appendChild(grupo.grupoUI);
        });
    }
    
    limpiarDatacompleta(){
        this.diccGrupos = {};
    }

    guardarGrupo(dataBruta,nombreTabla){

        let data;
        if (dataBruta instanceof Tabulator) {
            data =  dataBruta.getData();
        } 
        else{
            data = dataBruta[0].data;
        }

        let nombreTablaLimpio = this._obtenerNombreLimpio(nombreTabla);
        this.diccGrupos[nombreTablaLimpio] = new EdicionGrupo(data,nombreTablaLimpio);

        this._generarIndexHTML();
        this._limpiarChat();
    }

    _obtenerNombreLimpio(nombreTabla) {

        if (nombreTabla.includes("`")) {
            return nombreTabla.split(/`/g)[1];  
        }
        return nombreTabla; 
    }

    _limpiarChat(){
        mostrarElementos([this.chatVacio]);
        ocultarElementos([this.chatLleno]);

        this.inputMensaje.value = '';
        this.inputMensaje.dataset.tablaEdicion = '';
        this.inputMensaje.dataset.trazaRegistro = '';
        
    }

    async _guardarMensaje(){

        let dataMensaje = this._conseguirDataMensaje();
        if (this._esMensajeVacio(dataMensaje)){
            return;
        }

        let jsonEdicion = new JSONEdicion(dataMensaje);
        await actualizarData(jsonEdicion.guardarData);
        let respuestaMensaje = await obtenerData(jsonEdicion.obtenerData);

        let mensajeActualizado = respuestaMensaje[0].data[0].Ediciones;
        this.__actualizarEdicion(dataMensaje.nombreTabla,dataMensaje.trazaElemento,mensajeActualizado);
        
    }

    _conseguirDataMensaje(){
        let nombreTabla = this.inputMensaje.dataset.tablaEdicion;
        let trazaRegistro = this.inputMensaje.dataset.trazaRegistro;
        let mensaje = this.inputMensaje.value;
        this.inputMensaje.value = '';
        let mensajeFormateado = this._formatearEdicion(mensaje);

        return {
            nombreTabla: nombreTabla,
            trazaElemento: trazaRegistro,
            edicion: mensajeFormateado
        };
    }

    __actualizarEdicion(grupo, trazaEdicion, nuevaEdicion){
        this.diccGrupos[grupo].actualizarEdicionUnica(trazaEdicion, nuevaEdicion);
    }

    _esMensajeVacio(dataMensaje) {
        return !dataMensaje.nombreTabla || !dataMensaje.trazaElemento || !dataMensaje.edicion;
    }
    

    _formatearEdicion(mensaje){


        const mensajeSinComas = reemplazarComasPorPuntos(mensaje);
        const fechaActual = formatearFechaComoYYMMDD(new Date(),true); 
        const usuario = localStorage.getItem("user");
        const nuevoComentario = `;${fechaActual}, ${usuario}:, ${mensajeSinComas}`; 

        return nuevoComentario;
    }
    
}

export var edicionesHistorial = new EdicionesChatUI();

