import { describe, test, expect } from "@jest/globals";
import { Columna } from "../Columna";

describe("Columna", () => {
    let dataColumna;
    let columna;

    beforeEach(() => {
        dataColumna = {
            tablaMadreEnBD: { nombre: "clientes" },  
            nombreEnBD: "ID",
            nombre: "Identificación",
            nombreUI: "ID Cliente"
        };

        columna = new Columna(dataColumna);
    });

    describe("Inicializacion", () => {
        test("Debe inicializar correctamente con valores válidos", () => {    
            expect(columna.tablaMadreEnBD).toEqual(dataColumna.tablaMadreEnBD);
            expect(columna.nombreEnBD).toBe("ID");
            expect(columna.nombre).toBe("Identificación");
            expect(columna.nombreUI).toBe("ID Cliente");
        });
    
        test("Debe lanzar un error si falta un campo requerido", () => {
            delete dataColumna.nombreEnBD;  
            expect(() => new Columna(dataColumna)).toThrow("Falta el campo requerido: nombreEnBD");
        });

        test("nombreTablaMadre debe devolver el nombre de la tabla madre", () => {
            expect(columna.nombreTablaMadre).toBe("clientes");
        });

        test("nombreUnico debe devolver una combinación única de tabla y columna", () => {
            expect(columna.nombreUnico).toBe("clientes_Identificación");
        });
    });

    describe("Metodos usados por tabla", () => {
        test("Debe devolver el formato correcto para una tabla", () => {
            expect(columna.formatoTabla).toEqual({
                headerName: "ID Cliente",
                field: "Identificación"
            });
        });
    
        test("Debe devolver el nombre correcto de la tabla madre", () => {
            expect(columna.nombreTablaMadre).toBe("clientes");
        });
    });


    describe("Pruebas de formato", () => {

        let mockFormato;
        let columnaFormato;

        beforeEach(() => {
            mockFormato = new Columna({
                tablaMadreEnBD: { nombre: "empresas" },
                nombreEnBD: "empresa_id",
                nombre: "empresa",
                nombreUI: "Empresa"
            });

            columna.formato = mockFormato;
            columnaFormato = { field: "empresa" };
        });

        test("_agregarFormatoColumna debe agregar context.cacheReferencia y valueFormatter", () => {
            const resultado = columna._agregarFormatoColumna(columnaFormato);

            expect(resultado).toHaveProperty("context.cacheReferencia", "empresas_empresa");
            expect(typeof resultado.valueFormatter).toBe("function");
        });

        test("valueFormatter debe devolver el valor referenciado si está en cache", () => {
            window.cacheReferencias = {
                empresas_empresa: { "1": "Empresa A" }
            };

            const resultado = columna._agregarFormatoColumna(columnaFormato);
            const valueFormatter = resultado.valueFormatter;

            const params = {
                value: "1",
                colDef: { context: { cacheReferencia: "empresas_empresa" } }
            };

            expect(valueFormatter(params)).toBe("Empresa A");
        });

        test("valueFormatter debe devolver el mismo valor si no está en cache", () => {
            window.cacheReferencias = {
                empresas_empresa: { "1": "Empresa A" }
            };

            const resultado = columna._agregarFormatoColumna(columnaFormato);
            const valueFormatter = resultado.valueFormatter;

            const params = {
                value: "2", // No existe en cache
                colDef: { context: { cacheReferencia: "empresas_empresa" } }
            };

            expect(valueFormatter(params)).toBe("2");
        });
    });

    describe("Metodos de formmulario", () => {
    
        
        test("Debe crear el nodo HTML en modo vista", () => {
            const nodo = columna.crearHTML("vista");
    
            expect(nodo).not.toBeNull();
            expect(nodo.classList.contains("info-detail")).toBe(true);
            expect(nodo.children[0].tagName).toBe("H6");
            expect(nodo.children[1].tagName).toBe("P");
        });
    
        test("Debe crear el nodo HTML en modo edición", () => {
            const nodo = columna.crearHTML("edicion");
    
            expect(nodo).not.toBeNull();
            expect(nodo.classList.contains("info-detail")).toBe(true);
            expect(nodo.children[0].tagName).toBe("H6");
            expect(nodo.children[1].tagName).toBe("INPUT");
        });
    
        test("Debe cambiar de modo correctamente", () => {
            columna.crearHTML("vista");
            columna.cambiarAModo("edicion");
    
            expect(columna._modo).toBe("edicion");
            expect(columna._nodoHTML.children[1].tagName).toBe("INPUT");
    
            columna.cambiarAModo("vista");
            expect(columna._modo).toBe("vista");
            expect(columna._nodoHTML.children[1].tagName).toBe("P");
        });
    
        test("Debe actualizar el valor y reflejarlo en la UI", () => {
            columna.crearHTML("vista");
            columna.valor = "Alta";
    
            expect(columna._valor).toBe("Alta");
            expect(columna._nodoVista.textContent).toBe("Alta");
    
            columna.cambiarAModo("edicion");
            expect(columna._nodoEdicion.value).toBe("Alta");
        });
    
        test("Debe lanzar error si el modo es incorrecto", () => {
            expect(() => columna.crearHTML("otroModo")).toThrow("El modo de HTML ingresado es incorrecto");
            expect(() => columna.cambiarAModo("otroModo")).toThrow("El modo de HTML ingresado es incorrecto");
        });
    
    });
    
        
});

