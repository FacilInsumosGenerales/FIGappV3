import { Formulario } from "../Formulario.js";
import { describe, jest, test } from "@jest/globals";

describe.skip("Formulario", () => {

    let formulario;
    const crearColumnasMock = jest.fn((modo)=>{
        return document.createElement("input");
    });
    const cambiarModoMock = jest.fn();

    beforeAll(()=> {
        // En caso la clase columnas hace la insercion
        const mockColumnas = [
            {
                crearHTML: crearColumnasMock,
                valor: 2,
                nombre: "costo",
                nombreEnBD: "costo",
                cambiarModo: cambiarModoMock
            },
            {
                crearHTML: crearColumnasMock,
                valor: "Bolsa verde Tocuyo",
                nombre: "descripcion",
                nombreEnBD: "costo",
                cambiarModo: cambiarModoMock
            },
            {
                crearHTML: crearColumnasMock,
                valor: 12,
                nombre: "cantidad",
                nombreEnBD: "cantidad",
                cambiarModo: cambiarModoMock
            }
        ]

        let mockCuerpoFormulario = document.createElement("div");
        mockCuerpoFormulario.id = "cuerpoFormulario";
        document.body.appendChild(mockCuerpoFormulario);

        let mockBotonesFormulario = document.createElement("div");
        mockBotonesFormulario.id = "botonesFormulario";
        document.body.appendChild(mockBotonesFormulario);

        formulario = new Formulario(
            "cuerpoFormulario",
            "botonesFormulario",
            mockColumnas);
    })

    test.skip("Prueba de inicializacion de clase", () => {
        expect(formulario).toBeDefined();

        expect(formulario.cuerpoUI).toBeInstanceOf(HTMLElement);
        expect(formulario.botonesUI).toBeInstanceOf(HTMLElement);

        const botonEditar = document.body.querySelector(".editar-btn");
        const botonGuardar = document.body.querySelector(".guardar-btn");
        const botonCancelar = document.body.querySelector(".cancelar-btn");

        expect(botonEditar).not.toBeNull();
        expect(botonGuardar).not.toBeNull();
        expect(botonCancelar).not.toBeNull();

        expect(crearColumnasMock).toHaveBeenCalledTimes(3);
        expect(formulario.esModoEdicion).toBe(false);
        expect(formulario.columnas.length).toBe(3);
        
    });

    test.skip("Prueba de llenarData en Formulario", () => {

        const mockRow = {
            costo: 5,
            cantidad: 8,
            descripcion: "Bolsa amarillo Tocuyo"
        }

        formulario.llenarData(mockRow);

        expect(formulario.columnas[0].valor).toBe(5);
        expect(formulario.columnas[1].valor).toBe("Bolsa amarillo Tocuyo");
        expect(formulario.columnas[2].valor).toBe(8);
    });
        
    //Esta prueba realmente esta probando el click del boton, no necesariamente el que edicion cambie.
    test.skip("Prueba de cambiar estado a editale", () => {
        let btnEditar = document.body.querySelector(".editar-btn");
        btnEditar.click();
        expect(formulario.esModoEdicion).toBe(true);
        // Agregar la prueba de que sea visible los botones 
    });

     // Mismo comentario que antes. Esto esta probando si los botones responden no solamente el cambio de eestado
    test.skip("Prueba de cambiar estado a vista", () => {
        let btnCancelar = document.body.querySelector(".cancelar-btn");
        btnCancelar.click();

        expect(formulario.esModoEdicion).toBe(false);
        // Agregar la prueba de que sea visible los botones 

    });

    // Mismo comentario que los ultimos 2 tests
    test.skip("Prueba de guardar informacion", () => {
        const btnGuardar = document.body.querySelector(".guardar-btn");
        btnGuardar.click();
        expect(formulario.esModoEdicion).toBe(false);
        // Agregar la prueba de que sea visible los botones 
    }); 
     
})


