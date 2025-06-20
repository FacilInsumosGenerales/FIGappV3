import { obtenerData } from "../../controladores/api.js";
import { formatoFechaYYYYMMDD } from "../../utils/date_utils.js";
import { Columna } from "../Columna.js";
import { RecopiladorDatos } from "../RecopiladorDatos.js";


jest.mock("../../controladores/api.js", () => ({    
    obtenerData: jest.fn(() => {
        return Promise.resolve([]);
    }),
}));
    

jest.mock("../../utils/date_utils.js", () => ({
    formatoFechaYYYYMMDD: jest.fn(date => date.toISOString().split("T")[0]),
}));

jest.mock("../Columna.js", () => ({
    Columna: class {
        constructor(nombre, nombreEnBD, nombreTablaMadre = "tablaDefault") {
            this.nombre = nombre;
            this.nombreEnBD = nombreEnBD;
            this.nombreTablaMadre = nombreTablaMadre;
        }
    }
}));

const columnasMock = [
    new Columna("columna1", "col1"),
    new Columna("columna2", "col2"),
];

const tablaOrigenMock = {
    nombre: "tablaEjemplo",
    fechaGuia: "fecha_columna",
};

const buscadorMock = {
    fechaInicio: new Date("2024-01-01"),
    fechaFin: new Date("2024-01-31"),
};

// Datos simulados de la API
const datosMockAPI = [{ col1: "valor1", col2: "valor2" }];
const datosTransformados = [{ columna1: "valor1", columna2: "valor2" }];

describe.skip("RecopiladorDatos", () => {
    let recopilador;

    beforeEach(() => {
        jest.clearAllMocks();
        recopilador = new RecopiladorDatos(columnasMock, tablaOrigenMock);
    });

    describe("Inicialización", () => {
        test("Debe inicializar correctamente con parámetros válidos", () => {
            expect(recopilador.columnas).toEqual(columnasMock);
            expect(recopilador.tablaOrigen).toEqual(tablaOrigenMock);
            expect(recopilador.buscador).toBeNull();
        });

        test("Debe lanzar un error si las columnas no son un array", () => {
            expect(() => new RecopiladorDatos("noArray", tablaOrigenMock)).toThrow(
                "Las columnas deben ser un array."
            );
        });

        test("Debe lanzar un error si alguna columna no es una instancia de Columna", () => {
            const columnasInvalidas = [{ nombre: "incorrecta" }, "otraIncorrecta"];
            expect(() => new RecopiladorDatos(columnasInvalidas, tablaOrigenMock)).toThrow(
                "La columna en la posición 0 no es una instancia válida de Columna."
            );
        });

        test("Debe lanzar un error si tablaOrigen no tiene 'fechaGuia' y se usa un buscador", () => {
            expect(() => new RecopiladorDatos(columnasMock, {}, buscadorMock)).toThrow(
                "El objeto tablaOrigen debe contener el campo 'fechaGuia' cuando se usa un buscador."
            );
        });
    });


    describe.skip("Obtener datos", () => {
        test("Debe obtener y transformar datos correctamente", async () => {
            obtenerData.mockResolvedValueOnce([{ data: datosMockAPI }]);

            const datos = await recopilador.obtenerDatosTabla();

            expect(obtenerData).toHaveBeenCalledWith(recopilador.JSONget);
            expect(datos).toEqual(datosTransformados);
        });

        test("Debe manejar errores al obtener datos", async () => {
            obtenerData.mockRejectedValueOnce(new Error("Fallo en la API")); // Simula un fallo
        
            await expect(recopilador.obtenerDatosTabla()).rejects.toThrow("Fallo en la API");
        });
        

        test("Debe lanzar un error si la respuesta de la API no tiene datos válidos", async () => {
            obtenerData.mockResolvedValueOnce([{ data: null }]);
        
            await expect(recopilador.obtenerDatosTabla()).rejects.toThrow(
                "La respuesta del servidor no tiene datos válidos."
            );
        });
        
    });




    describe("Actualización de Referencias", () => {

        //Estos test son incorrectos. lo que necesito probar es que cuando la data se llame, no se esten llamando si toda la data ya fue llamada antes. Lo que me importa es el numero de llamados no si se guarda correctamente o no
        //
        
        jest.mock("../../controladores/api.js", () => ({
            obtenerData: jest.fn(() => Promise.resolve([{ data: [{ TRAZA: 1, Nombre: "Empresa A" }] }])),
        }));
        
        describe("RecopiladorDatos - Actualización de Referencias", () => {
            let recopilador, columnaReferenciada, dataMock;
        
            beforeEach(() => {
                global.window = global; // Asegurar que `window` está compartido en Jest
                window.cacheReferencias = {}; // Inicializar la caché correctamente
        
                columnaReferenciada = new Columna({
                    tablaMadreEnBD: { nombre: "empresas" },
                    nombreEnBD: "empresa_id",
                    nombre: "empresa",
                    nombreUI: "Empresa",
                    formato: new Columna({  
                        tablaMadreEnBD: { nombre: "referencias" },
                        nombreEnBD: "referencia_id",
                        nombre: "referencia",
                        nombreUI: "Referencia"
                    })
                });
                
        
                recopilador = new RecopiladorDatos([columnaReferenciada], { nombre: "tablaEjemplo" });
        
                dataMock = [{empresa: 1 }, { empresa_id: 2 }];
            });
        
            test("Debe actualizar referencias y almacenar en cache", async () => {
                await recopilador._cargarReferencias(dataMock);
                console.log(window.cacheReferencias);
                expect(window.cacheReferencias["empresas_empresa"]).toHaveProperty("1", "Empresa A");
            });
        
            test("Debe ignorar valores ya almacenados en cache", async () => {
                window.cacheReferencias["empresas_empresa"] = { "1": "Empresa A" };
                await recopilador._cargarReferencias(dataMock);
                expect(window.cacheReferencias["empresas_empresa"]).not.toHaveProperty("2"); 
            });
        });
        
    });


});
