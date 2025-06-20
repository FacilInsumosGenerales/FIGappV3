import { Formulario } from "./informe/Formulario.js";
import { Informe } from "./informe/BaseInforme.js";
import { eliminarMensajeTemporal } from "./Validador.js";

export class Modal {
    constructor(informeOFormulario) {
        this._verificarInforme(informeOFormulario);

        this.informe = informeOFormulario;
        this.modalID = informeOFormulario.modalID ?? '';

        this.modal = this._crearModal();

            
    }

    _verificarInforme(objeto) {
        if (!(objeto instanceof Informe)) {
            throw new Error("Modal solo puede trabajar con informes o clases que hereden de Informe");
        }
    }
    
    _crearModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        if (this.modalID) {
            modal.id = this.modalID;
        }
        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">${this.informe.titulo ?? ""}</h4>
                    <button class="btn-close" type="button" data-bs-dismiss="modal" onclick="document.body.focus();"></button>
                </div>
                <div class="modal-body"></div>
            </div>
        </div>`;
    
        document.body.appendChild(modal);
    
        const modalBody = modal.querySelector(".modal-body");
        modalBody.appendChild(this.informe.cuerpoUI);

        this._crearFooter(modal);
        
        return new bootstrap.Modal(modal);
    }

    _crearFooter(modal) {
        if (this.informe instanceof Formulario) {
            const modalFooter = document.createElement("div");
            modalFooter.id = this.informe.idBotones;
            modalFooter.classList.add("modal-footer");
            
            this.informe.botones.forEach(boton => modalFooter.appendChild(boton));

            modal.querySelector(".modal-content").appendChild(modalFooter);
        }
    }


    abrir(fila=null) {
        if (fila) {
            this.informe.llenarData(fila);

            if (this.informe instanceof Formulario) {
                this.informe.actualizarAModo('vista');
            };
        }

        else{
            this.informe.vaciar();
            if (this.informe instanceof Formulario) {
                this.informe.actualizarAModo('edicion');
            };
        }

        eliminarMensajeTemporal();
        this.modal.show();
    }

    actualizarValorColumna(columna,valor){
        if (this.informe instanceof Formulario) {
            this.informe.actualizarValorColumna(columna,valor);
        };
    }

}

export function cerrarModales() {
    const modales = document.querySelectorAll('.modal');

    modales.forEach(modalElemento => {
        // Revisa si el modal está visible
        const instanciaModal = bootstrap?.Modal?.getInstance(modalElemento) 
                            || bootstrap?.Modal?.getOrCreateInstance?.(modalElemento) 
                            || modalElemento._modalInstance;

        if (instanciaModal) {
            instanciaModal.hide();
        }
    });
}