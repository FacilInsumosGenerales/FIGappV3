import { categoriaComprobantePago, Monedas, tipoComprobantePago } from "../../data/estados_data.js";

beforeEach(() => {
    // Simular el DOM antes de cada test
    document.body.innerHTML = `
        <button id="btnNuevoComprobante">Nuevo Comprobante</button>
    `;
});

test("Debe renderizar correctamente con los elementos del DOM", async () => {


    const dataModalComprobante = {
        "nombreTabla": "comprobantes de pago",
        "columnas": 
            [
                { 
                    id: "comprobanteTraza", 
                    nombreColumnaTabulator: "TRAZA",
                    tipoInput: "parrafo", 
                    placeholder: "TRAZA", 
                    nombreColumnaBD: "TRAZA" 
                }                                   
            ]
    }; 
    
    //let modalComprobante = await ModalFabrica.crearModal(dataModalComprobante);

    // Verificar que la función fue llamada con los datos correctos
    //expect(ModalFabrica.crearModal).toHaveBeenCalledWith(dataModalComprobante);

    // Verificar que se obtuvo un modal (simulado)
    //expect(modalComprobante).toEqual({ modal: "mockedModal" });

});
