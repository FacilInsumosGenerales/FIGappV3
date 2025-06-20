import { beforeEach, describe, jest, test, expect } from "@jest/globals";
import { TablaVista } from "../TablaVista.js";

const columnasMock = [
    { formatoTabla: { field: "TRAZA", headerName: "campo TRAZA" } },
    { formatoTabla: { field: "valor", headerName: "campo valor" } },
    { formatoTabla: { field: "moneda", headerName: "campo moneda" } },
];

const datosMockInicial = [
    { TRAZA: 1, valor: "Ana", moneda: "USD" },
    { TRAZA: 2, valor: "Carlos", moneda: "EUR" }
];

const datosMockActualizados = [
    { TRAZA: 3, valor: "Maria", moneda: "GBP" },
    { TRAZA: 4, valor: "Jose", moneda: "MXN" }
];

const mockRecopiladorDatos = {
    columnas: columnasMock,
    obtenerDatosTabla: jest.fn(() => Promise.resolve(datosMockInicial))
};

const contenedorID = "tabla-container";

describe("TablaVista", () => {
    let tablaVista;

    beforeEach(async () => {
        jest.clearAllMocks();
        document.body.innerHTML = `<div id="${contenedorID}"></div>`;
        tablaVista = new TablaVista(mockRecopiladorDatos);
        await tablaVista.renderizar(contenedorID);
    });

    describe("Inicializacion y renderizacion", ()=>{
        test("Debe inicializar columnas correctamente", () => {
            expect(tablaVista._infoColumnas).toEqual(columnasMock.map(col => col.formatoTabla));
        });
    
        test("Debe lanzar error si el contenedor no existe", async () => {
            await expect(tablaVista.renderizar("contenedor-inexistente"))
                .rejects.toThrow("Elemento con ID contenedor-inexistente no encontrado.");
        });
    
        test("Debe renderizar la tabla correctamente", async () => {
            expect(global.agGrid.createGrid).toHaveBeenCalledTimes(1);
            expect(tablaVista.datosOriginales).toEqual(datosMockInicial);
        });

    });

    describe("Conección con los datos", ()=>{
        test("Debe actualizar y almacenar datos", async () => {
            mockRecopiladorDatos.obtenerDatosTabla.mockResolvedValueOnce(datosMockActualizados);
            await tablaVista.actualizarData();
            expect(mockRecopiladorDatos.obtenerDatosTabla).toHaveBeenCalled();
            expect(tablaVista.datosFiltrados).toEqual(datosMockActualizados);
        });
    });

    describe("Filtro de datos", ()=>{

        test("Debe aplicar filtro correctamente", async () => {
            tablaVista.filtrarTabla("Ana");
            expect(tablaVista.datosFiltrados).toEqual([{ TRAZA: 1, valor: "Ana", moneda: "USD" }]);
        });
    
        test("Debe restaurar datos originales si el filtro está vacío", async () => {
            tablaVista.filtrarTabla("");
            expect(tablaVista.datosFiltrados).toEqual(datosMockInicial);
        });
    
        test("Debe ignorar espacios en filtros", async () => {
            tablaVista.filtrarTabla("  Ana  ;   EUR  ");
            expect(tablaVista.datosFiltrados).toEqual(datosMockInicial);
        });
    
        test("Debe ser insensible a mayúsculas y minúsculas", async () => {
            tablaVista.filtrarTabla("ana");
            expect(tablaVista.datosFiltrados).toEqual([{ TRAZA: 1, valor: "Ana", moneda: "USD" }]);
        });
    
        test("Debe devolver un array vacío si ningún dato coincide con el filtro", async () => {
            tablaVista.filtrarTabla("XYZ");
            expect(tablaVista.datosFiltrados).toEqual([]);
        });
    });
     
});
