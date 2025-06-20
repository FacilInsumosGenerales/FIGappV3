import { Informe } from "../BaseInforme";

describe("Informe", () => {
    let columnasMock;
    let container;
    let informe;

    beforeEach(() => {
        // Mock de columnas
        columnasMock = [
            { nombre: "columna1", crearHTML: jest.fn(() => document.createElement("div")), valor: "" },
            { nombre: "columna2", crearHTML: jest.fn(() => document.createElement("div")), valor: "" }
        ];

        // Mock del DOM
        container = document.createElement("div");
        container.id = "cuerpoId";
        document.body.appendChild(container);

        informe = new Informe(columnasMock);

    });

    afterEach(() => {
        document.body.innerHTML = ""; 
    });

    test("constructor inicializa columnas y construye el cuerpo correctamente", () => {

        expect(informe.columnas).toBe(columnasMock);
        expect(informe.cuerpoUI).toBeInstanceOf(HTMLElement);
        expect(columnasMock[0].crearHTML).toHaveBeenCalledWith("vista");
        expect(columnasMock[1].crearHTML).toHaveBeenCalledWith("vista");
    });

    test("renderizar(idCuerpo) reemplaza el contenido del elemento", () => {
        informe.renderizar(container.id);

        expect(container.children.length).toBe(1);
        expect(container.firstChild).toBe(informe.cuerpoUI);
    });

    test("llenarData(row) actualiza los valores de las columnas", () => {
        const rowData = { columna1: "dato1", columna2: "dato2" };

        informe.llenarData(rowData);

        expect(columnasMock[0].valor).toBe("dato1");
        expect(columnasMock[1].valor).toBe("dato2");
    });
});
