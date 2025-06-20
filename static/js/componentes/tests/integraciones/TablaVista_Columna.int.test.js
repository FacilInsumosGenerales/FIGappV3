import { Columna } from "../../Columna";
import { TablaVista } from "../../TablaVista";

describe("Integración TablaVista - Columna", () => {
    let mockRecopiladorDatos, tablaVista, columnas;

    beforeEach(async () => {
        columnas = [
            new Columna({ tablaMadreEnBD: { nombre: "usuarios" }, nombreEnBD: "id", nombre: "id", nombreUI: "ID" }),
            new Columna({ tablaMadreEnBD: { nombre: "usuarios" }, nombreEnBD: "nombre", nombre: "nombre", nombreUI: "Nombre" })
        ];

        mockRecopiladorDatos = {
            columnas,
            obtenerDatosTabla: jest.fn().mockResolvedValue([
                { id: 1, nombre: "Alice" },
                { id: 2, nombre: "Bob" }
            ])
        };

        tablaVista = new TablaVista(mockRecopiladorDatos);
        
        document.body.innerHTML = '<div id="tabla"></div>';
        await tablaVista.renderizar("tabla");
    });

    test("Inicialización correcta de TablaVista con columnas de Columna", () => {
        expect(tablaVista.columnas).toHaveLength(2);
        expect(tablaVista._infoColumnas).toEqual([
            { headerName: "ID", field: "id" },
            { headerName: "Nombre", field: "nombre" }
        ]);
    });

    test("renderizar obtiene datos y los almacena en datosOriginales",  () => {

        expect(tablaVista.datosOriginales).toEqual([
            { id: 1, nombre: "Alice" },
            { id: 2, nombre: "Bob" }
        ]);
    });

    test("filtrarTabla filtra correctamente los datos", async () => {
        await tablaVista._conseguirDatos();
        tablaVista.filtrarTabla("Alice");

        expect(tablaVista.datosFiltrados).toEqual([{ id: 1, nombre: "Alice" }]);
    });

    test("actualizarData obtiene nuevos datos y actualiza la tabla", async () => {
        mockRecopiladorDatos.obtenerDatosTabla.mockResolvedValue([
            { id: 3, nombre: "Charlie" }
        ]);

        await tablaVista.actualizarData();
        
        expect(tablaVista.datosOriginales).toEqual([{ id: 3, nombre: "Charlie" }]);
    });
});
