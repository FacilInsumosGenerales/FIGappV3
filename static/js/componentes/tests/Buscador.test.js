import { formatoFechaYYYYMMDD } from "../../utils/date_utils.js";
import { Buscador } from "../Buscador.js";
import { describe, test, beforeEach, expect } from "@jest/globals";

jest.mock("../../utils/date_utils.js", () => {
    const originalModule = jest.requireActual("../../utils/date_utils.js"); // Obtiene el módulo real
    return {
        obtenerRangoDeFechas: jest.fn(() => ({
            fechaActual: new Date("2025-03-15"),
            fechaInicioRango: new Date("2025-03-01")
        })),
        formatoFechaYYYYMMDD: jest.fn(fecha => new Date(fecha).toISOString().split('T')[0]),
    };
});

describe("Buscador", () => {
    let buscador;

    const inicializarDOM = () => {
        document.body.innerHTML = `
            <input id="input-search" type="search">
            <input id="input-fecha1" type="date">
            <input id="input-fecha2" type="date">
        `;
    };

    beforeEach(() => {
        jest.clearAllMocks();
        inicializarDOM();
        buscador = new Buscador();
    });

    describe("Carga e inicialización de buscador", () => {
        test("Debe inicializar con valores correctos", () => {
            expect(buscador.tablasConectadas).toEqual([]);
            expect(buscador.fechaInicio).toEqual(new Date("2025-03-01"));
            expect(buscador.fechaFin).toEqual(new Date("2025-03-15"));
        });

        test("Debe renderizar y asignar correctamente los elementos HTML", () => {
            buscador.renderizar();

            expect(buscador.busquedaContenedor).toBe(document.getElementById("input-search"));
            expect(buscador.fechaInicioContenedor).toBe(document.getElementById("input-fecha1"));
            expect(buscador.fechaFinContenedor).toBe(document.getElementById("input-fecha2"));

            expect(buscador.fechaInicioContenedor.value).toBe("2025-03-01");
            expect(buscador.fechaFinContenedor.value).toBe("2025-03-15");
            expect(buscador.busquedaContenedor.value).toBe("");
        });
    });

    describe("Modificación de valores en el buscador", () => {
        beforeEach(() => {
            buscador.renderizar();
        });

        test("Debe establecer y obtener el valor de búsqueda correctamente", () => {
            buscador.busqueda = "Prueba de búsqueda";
            expect(buscador.busqueda).toBe("Prueba de búsqueda");
            expect(buscador.busquedaContenedor.value).toBe("Prueba de búsqueda");
        });

        test("Debe aceptar múltiples formatos en el campo de búsqueda", () => {
            buscador.busqueda = 123;
            expect(buscador.busqueda).toBe("123");
            expect(buscador.busquedaContenedor.value).toBe("123");
        });

        test("Debe actualizar correctamente la fecha de inicio", () => {
            const nuevaFecha = new Date();
            const fechaEsperada = formatoFechaYYYYMMDD(nuevaFecha);

            buscador.fechaInicio = nuevaFecha;

            expect(formatoFechaYYYYMMDD(buscador.fechaInicio)).toBe(fechaEsperada);
            expect(buscador.fechaInicioContenedor.value).toBe(fechaEsperada);
        });

        test("Debe actualizar correctamente la fecha final", () => {
            const nuevaFecha = "2024-07-10";

            buscador.fechaFin = nuevaFecha;

            expect(formatoFechaYYYYMMDD(buscador.fechaFin)).toBe(nuevaFecha);
            expect(buscador.fechaFinContenedor.value).toBe(nuevaFecha);
        });
    });

    describe("Eventos y disparadores del buscador", () => {
        beforeEach(() => {
            buscador.renderizar();
        });

        test("Debe disparar un evento de búsqueda al modificar la busqueda", () => {
            const mockEvento = jest.fn();
            buscador.eventDispatcher.addEventListener("busqueda", mockEvento);

            buscador.busqueda = "Nuevo valor";

            expect(mockEvento).toHaveBeenCalledTimes(1);
            expect(buscador.busquedaContenedor.value).toBe("Nuevo valor");
        });

        test("Debe disparar el evento 'cambioFechas' cuando cambian las fechas", () => {
            const mockEvento = jest.fn();
            buscador.eventDispatcher.addEventListener("cambioFechas", mockEvento);

            buscador.fechaInicio = new Date("2025-02-11");
            buscador.fechaFin = new Date("2025-03-11");

            expect(mockEvento).toHaveBeenCalledTimes(2);


        });

        test("Debe restaurar la fecha de inicio si el campo está vacío", () => {
            buscador.fechaInicioContenedor.value = "";  
            buscador.fechaInicioContenedor.dispatchEvent(new Event("change"));
    
            expect(buscador.fechaInicioContenedor.value).toBe("2025-03-01"); 
            expect(buscador.fechaInicio).toEqual(new Date("2025-03-01"));
        });
    
        test("Debe restaurar la fecha final si el campo está vacío", () => {
            buscador.fechaFinContenedor.value = "";  
            buscador.fechaFinContenedor.dispatchEvent(new Event("change"));
    
            expect(buscador.fechaFinContenedor.value).toBe("2025-03-15");  
            expect(buscador.fechaFin).toEqual(new Date("2025-03-15"));
        });
    
        test("Debe actualizar correctamente la fecha de inicio cuando cambia", () => {
            const nuevaFecha = "2025-02-11";
            buscador.fechaInicioContenedor.value = nuevaFecha;
            buscador.fechaInicioContenedor.dispatchEvent(new Event("change"));
    
            expect(buscador.fechaInicioContenedor.value).toBe(nuevaFecha);  
            expect(formatoFechaYYYYMMDD(buscador.fechaInicio)).toBe(nuevaFecha);  
        });
    
        test("Debe actualizar correctamente la fecha final cuando cambia", () => {
            const nuevaFecha = "2025-04-20";
            buscador.fechaFinContenedor.value = nuevaFecha;
            buscador.fechaFinContenedor.dispatchEvent(new Event("change"));
    
            expect(buscador.fechaFinContenedor.value).toBe(nuevaFecha);  
            expect(formatoFechaYYYYMMDD(buscador.fechaFin)).toBe(nuevaFecha); 
        });

    });
});
