import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import { TablaVista } from "../../TablaVista";
import { RecopiladorDatos } from "../../RecopiladorDatos";


const columnas = [
    { nombreTablaMadre: "clientes", nombreEnBD: "ID_bd", nombre: "ID", formatoTabla: { field: "ID" } },
    { nombreTablaMadre: "clientes", nombreEnBD: "Nombre_bd", nombre: "Nombre", formatoTabla: { field: "Nombre" } }
];

const tablaOrigen = { nombreTabla: "clientes", fechaGuia: "FechaRegistro" };

const mockDatosServidor = [
    { ID_bd: 1, Nombre_bd: "Ana" },
    { ID_bd: 2, Nombre_bd: "Carlos" },
    { ID_bd: 3, Nombre_bd: "Elena" }
];

const dataFormatoTablaEsperada = [
    { ID: 1, Nombre: "Ana" },
    { ID: 2, Nombre: "Carlos" },
    { ID: 3, Nombre: "Elena" }
];

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "mocked data" }),
    })
);
  
  

describe.skip("Integración entre TablaVista y RecopiladorDatos", () => {
    let recopiladorDatos;
    let tablaVista;

    beforeEach(() => {
        document.body.innerHTML = '<div id="tabla-container"></div>';
        jest.clearAllMocks();

        global.obtenerData = jest.fn(() => Promise.resolve([{ data: mockDatosServidor }]));

        recopiladorDatos = new RecopiladorDatos(columnas, tablaOrigen);
        tablaVista = new TablaVista(recopiladorDatos);
        tablaVista.renderizar("tabla-container");
    });

    test("Debe obtener datos desde RecopiladorDatos y almacenarlos en TablaVista", async () => {

        expect(global.obtenerData).toHaveBeenCalledWith(recopiladorDatos.JSONget);
        expect(tablaVista.datosOriginales).toEqual(dataFormatoTablaEsperada);
    });

    test("Debe filtrar los datos correctamente en TablaVista", async () => {
        await tablaVista.actualizarData();
        tablaVista.filtrarTabla("Ana");

        expect(tablaVista.datosFiltrados).toEqual([{ ID: 1, Nombre: "Ana" }]);
    });

    test("Debe restaurar los datos originales cuando se borra el criterio de búsqueda", async () => {
        await tablaVista.actualizarData();
        tablaVista.filtrarTabla("");  

        expect(tablaVista.datosFiltrados).toEqual(dataFormatoTablaEsperada);
    });

    test("Debe renderizar correctamente la tabla con agGrid", async () => {
        await tablaVista.renderizar("tabla-container");

        expect(global.agGrid.createGrid).toHaveBeenCalledWith(
            expect.any(HTMLElement),
            expect.objectContaining({
                rowData: expect.any(Array), // 🔹 Validamos que rowData es un array
                columnDefs: expect.any(Array),
                api: expect.any(Object)
            })
        );

        // 🔹 Verificamos que la API de agGrid ha sido inicializada correctamente
        expect(tablaVista.gridOpciones.api).toBeDefined();
        expect(tablaVista.gridOpciones.api.setRowData).toBeDefined();
    });

    test("Debe actualizar la tabla cuando se actualizan los datos en RecopiladorDatos", async () => {
        await tablaVista.actualizarData();
        expect(tablaVista.datosOriginales).toEqual(dataFormatoTablaEsperada);

        // 🔹 Simulamos una nueva respuesta del servidor
        const nuevosDatos = [{ ID: 4, Nombre: "Luis" }];
        global.obtenerData.mockResolvedValueOnce([{ data: nuevosDatos }]);

        await tablaVista.actualizarData();

        expect(tablaVista.datosOriginales).toEqual(nuevosDatos);
        expect(tablaVista.gridOpciones.api.setRowData).toHaveBeenCalledWith(nuevosDatos);
    });
});
