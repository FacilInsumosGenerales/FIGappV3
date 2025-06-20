import { describe, test, beforeEach, jest, expect } from "@jest/globals";
import { Buscador } from "../../Buscador";
import { TablaVista } from "../../TablaVista";



describe.skip("Integración Buscador y TablaVista", () => {
    const columnasMock = [
        { formatoTabla: { field: "TRAZA", headerName: "campo TRAZA" } },
        { formatoTabla: { field: "valor", headerName: "campo valor" } },
        { formatoTabla: { field: "moneda", headerName: "campo moneda" } },
    ];
    
    const datosMock = [
        { TRAZA: 1, valor: "Ana", moneda: "USD" },
        { TRAZA: 2, valor: "Carlos", moneda: "EUR" },
    ];
    
    const mockRecopiladorDatos = {
        columnas:columnasMock,
        obtenerDatosTabla: jest.fn(() => Promise.resolve(datosMock))
    };

    let buscador;
    let tablaVista;

    beforeEach(async () => {
        // 🔹 Configuramos el DOM
        document.body.innerHTML = `
            <input id="input-search" type="search">
            <input id="input-fecha1" type="date">
            <input id="input-fecha2" type="date">
            <div id="tabla-container"></div>
        `;

        jest.clearAllMocks();

        // 🔹 Inicializamos componentes
        buscador = new Buscador();
        tablaVista = new TablaVista(mockRecopiladorDatos);
        await tablaVista.renderizar("tabla-container");

        // 🔹 Conectamos `Buscador` con `TablaVista`
        buscador.conectarTabla(tablaVista);
    });

    test("El buscador debe filtrar correctamente los datos en TablaVista", async () => {
        await tablaVista.actualizarData();
        buscador.busqueda = "Ana"; 

        expect(tablaVista.datosFiltrados).toEqual([{ TRAZA: 1, valor: "Ana", moneda: "USD" }]);
    });

    test("El buscador debe actualizar los datos de la tabla cuando cambian las fechas", async () => {
        const mockActualizar = jest.spyOn(tablaVista, "actualizarData");

        buscador.fechaInicio = "2025-01-01";
        buscador.fechaFin = "2025-12-31";

        expect(mockActualizar).toHaveBeenCalledTimes(2); 
    });

    test("El buscador debe conectarse correctamente a la tabla", () => {
        expect(buscador.tablasConectadas).toContain(tablaVista);
    });

    test("La tabla debe recibir eventos de búsqueda desde el buscador", () => {
        const mockFiltrar = jest.spyOn(tablaVista, "filtrarTabla");

        buscador.busqueda = "Carlos";

        expect(mockFiltrar).toHaveBeenCalledWith("Carlos");
    });

});
