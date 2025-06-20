import { obtenerRangoDeFechas, sumarDiasAFecha } from "../date_utils.js"; 

describe("Pruebas para funciones de fecha", () => {
    
    test("obtenerRangoDeFechas debe devolver la fecha actual y la de hace un mes", () => {
        const hoyEsperado = new Date();
        const haceUnMesEsperado = new Date();
        haceUnMesEsperado.setMonth(haceUnMesEsperado.getMonth() - 1);

        const { fechaActual, fechaInicioRango } = obtenerRangoDeFechas();

        expect(fechaActual.toDateString()).toBe(hoyEsperado.toDateString());
        expect(fechaInicioRango.toDateString()).toBe(haceUnMesEsperado.toDateString());
    });

    test("sumarDiasAFecha debe sumar días correctamente", () => {
        const fechaBase = new Date("2024-07-01");
        const resultadoEsperado = new Date("2024-07-06");

        expect(sumarDiasAFecha(fechaBase, 5).toDateString()).toBe(resultadoEsperado.toDateString());
    });

    test("obtenerRangoDeFechas debe aceptar un desplazamiento personalizado", () => {
        const desplazamiento = -3;
        const fechaEsperada = new Date();
        fechaEsperada.setMonth(fechaEsperada.getMonth() + desplazamiento);

        const { fechaInicioRango } = obtenerRangoDeFechas(desplazamiento);

        expect(fechaInicioRango.toDateString()).toBe(fechaEsperada.toDateString());
    });
});
