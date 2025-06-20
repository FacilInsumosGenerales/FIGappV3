import { Modal } from "../componentes/Modal.js";
import { ColumnaFabrica } from "./ColumnaFabrica.js";
import { generarCadenaAleatoria } from "./TablaVistaFabrica.js";

export class ModalFabrica {
    static async crearModal(tablaInfo) {
        const nombreTabla = tablaInfo.nombreTabla;
        const id = "modal-" + generarCadenaAleatoria();
        
        const columnas = await Promise.all(
            tablaInfo.columnas.map(col => new Columna(col,id))
        );

        const modalUI = ModalFabrica._crearModalUI(nombreTabla, columnas, id);
        const modalUIBootstrap = new bootstrap.Modal(modalUI);

        return new Modal(nombreTabla, columnas, modalUI, modalUIBootstrap);
    }

    static _crearModalUI(nombreTabla, columnas,id) {
        let modal = document.createElement("div");
        modal.id = id;
        modal.classList.add("modal", "fade");
        modal.setAttribute("data-bs-backdrop", "static");
        modal.setAttribute("data-bs-keyboard", "false");

        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">${nombreTabla}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body"></div> 
                    <div class="modal-footer">
                        <button class="btn btn-success guardar-btn" data-bs-dismiss="modal">Guardar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        let modalBody = modal.querySelector(".modal-body");
        columnas.forEach(col => modalBody.appendChild(col.crearElementoHTML()));

        return modal;
    }
}



