// TODO: Esta clase hace demasiado. Los calculos deberian ser manejados por otra entidad. Aqui entran con los datos completos
import { config } from "../../../../config.js";
import { GestorDeErrores } from "../GestorDeErrores.js";

// Esto permite que no importa que nombre de columnas hayan el codigo de Plantillas se mantenga el mismo <3
const columnasProductosUtilizadas = {
    "Cantidad": "cantidad",
    "Costo_x_Unidad_SIN_IGV_en_Soles": "costoXUnidadProveedorSoles",
    "Costo_x_Unidad_SIN_IGV_en_moneda_de_oferta": "costoXUnidadProveedor",
    "Descripcion_proveedor": "descripcionProveedor",
    "Descripcion_cliente": "descripcionCliente",
    "Dias_entrega_proveedor": "diasEntregaProveedor",
    "Dias_entrega_cliente": "diasEntregaCliente",
    "Fecha_de_proveedor": "diasEntregaProveedor",
    "Fecha_de_cliente": "diasEntregaCliente",
    "Grupo": "grupo",
    "Marca": "marca",
    "Modelo": "modelo",
    "Medida": "medida",
    "Precio_Venta_x_Unidad_SIN_IGV_en_moneda_de_oferta": "precioXUnidadCliente",
    "Precio Venta x Unidad SIN IGV en en Soles": "precioXUnidadClienteSoles",
    "TRAZA": "TRAZA",
    "UMedida": "medida",
    "Imagen_Referencial": "imagen",
};

const HTML2PDFOpciones = {
    margin: [0, 0, 1, 0],
    html2canvas: { scale: 2.5 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { avoid: ["tr"], before: ".page-break-before" }
};

export const PLANTILLA_FILA_PRODUCTO = `
    <tr class="c45">
        <td class="c35" colspan="1" rowspan="1">
            <p class="c18"><span class="c0">{TITULO}</span></p>
            {DESCRIPCION}
            {IMAGENES}
        </td>
        <td class="c41" colspan="1" rowspan="1">
            <p class="c14"><span class="c0">{ENTREGA}</span></p>
        </td>
        <td class="c49" colspan="1" rowspan="1">
            <p class="c14"><span class="c0">{MEDIDA}</span></p>
        </td>
        <td class="c41" colspan="1" rowspan="1">
            <p class="c14"><span class="c0">{CANTIDAD}</span></p>
        </td>
        <td class="c43" colspan="1" rowspan="1">
            <p class="c14"><span class="c0">{PRECIO_UNIDAD}</span></p>
        </td>
        <td class="c53" colspan="1" rowspan="1">
            <p class="c14"><span class="c0">{PRECIO_TOTAL}</span></p>
        </td>
    </tr>
`;

export const GeneradorHTML = {
    generarCampo: (etiqueta, valor) => valor ? `<p class="c18"><span class="c0">${etiqueta}: ${valor}</span></p>` : "",
    generarImagen: (src) => src ? `<img style="width: 84px; height: auto;" src="${src}" alt="Imagen del producto">` : ""
};

export class BasePlantillaPDF {

    constructor(plantillaHTML) {
        this.plantillaHTMLOriginal = plantillaHTML;
        this.plantillaHTML = null;
        this.resumenFinanciero = null;
    }

    async generarPDF(datos, productos, gruposProductos = null) {
        this._copiarPlantilla();
        this._llenarEncabezado(datos);
        await this._llenarProductos(productos, datos, gruposProductos); 

        try {
            return await this._convertirAFormatoPDF();
        } catch (error) {
            console.error("Error al generar el PDF:", error);
            throw error;
        }
    }

    async _copiarPlantilla(){
        this.plantillaHTML = this.plantillaHTMLOriginal;
    }
    
    async _convertirAFormatoPDF() {
        console.log("Generando PDF...");

        const formattedContent = this.plantillaConSaltos;
        const elemento = document.createElement("div");
        elemento.innerHTML = formattedContent;

        
        const generadorPdf = html2pdf().set(HTML2PDFOpciones).from(elemento);
        const blobPdf = await generadorPdf.outputPdf("blob");

        if (!blobPdf || !(blobPdf instanceof Blob)) {
            throw new Error("El PDF generado no es un Blob válido.");
        }

        console.log("PDF generado correctamente.");
        return { blob: blobPdf, url: URL.createObjectURL(blobPdf) };
    }

    get plantillaConSaltos() {
        return this.plantillaHTML.replace(/<tr>/g, '<tr class="page-break-before">');
    }
    
    _llenarEncabezado(datos) {
        throw new Error(`Este método debe ser implementado por una subclase. Recibido: ${datos}`);
    }

    async _llenarProductos(productosColumnasCompletas, datos,gruposProductos = null,) {

        const productos = this.__normalizarColumnasProductos(productosColumnasCompletas);

        const productosMayuscula = this._convertirATodoMayusculas(productos);

        const productosConImagenes = await this.validarImagenes(productosMayuscula);

        this._renderizarProductos(productosConImagenes,gruposProductos,datos.mostrarDetalle);

        this._obtenerResumenFinanciero(productos, datos.conIGV);
        this._renderizarResumenFinanciero();
        
    }
    
    __normalizarColumnasProductos(productos) {
        return productos.map(producto => this._normalizarUnProducto(producto));
    }

    _convertirATodoMayusculas(productos) {
        return productos.map(item => ({
            ...item,
            descripcionProveedor: item.descripcionProveedor ? item.descripcionProveedor.toUpperCase() : "",
            descripcionCliente: item.descripcionCliente ? item.descripcionCliente.toUpperCase() : "",
            marca: item.marca ? item.marca.toUpperCase() : "",
            modelo: item.modelo ? item.modelo.toUpperCase() : "",
            medida: item.medida ? item.medida.toUpperCase() : "",
        }));
    }
    
    
    _normalizarUnProducto(producto) {
        const productoFiltrado = this.__filtrarColumnasRelevantes(producto);
        return this.__renombrarColumnas(productoFiltrado);
    } 

    __filtrarColumnasRelevantes(producto) {
        return Object.fromEntries(
            Object.entries(producto)
                .filter(([columna]) => columna in columnasProductosUtilizadas)
        );
    }
    
    __renombrarColumnas(productoFiltrado) {
        return Object.fromEntries(
            Object.entries(productoFiltrado)
                .map(([columna, valor]) => [columnasProductosUtilizadas[columna], valor])
        );
    }
    
    async validarImagenes(productos) {
        let hayErrores = false;
    
        const productosValidados = await Promise.all(
            productos.map(async (producto) => {
                const resultado = await this._validarUnaImagen(producto);
                if (resultado.huboError) hayErrores = true;
                return resultado.producto;
            })
        );
    
        if (hayErrores) {
            GestorDeErrores.notificarAlerta('Algunas imágenes no son válidas y han sido eliminadas.');
        }
    
        return productosValidados;
    }
    
    async _validarUnaImagen(producto) {

        if (producto.imagen === null || producto.imagen.trim() === "") {
            return { producto, huboError: false }; 
        }        
    
        const imagenValida = await this._imagenEsValida(producto.imagen);
        if (!imagenValida) {
            return { producto: { ...producto, imagen: null }, huboError: true };
        }
    
        return { producto: { ...producto, imagen: this._generarRutaImagen(producto.imagen) }, huboError: false };
    }
    
    _imagenEsValida(src) {
        if (typeof src !== "string") return Promise.resolve(false);
    
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = this._generarRutaImagen(src);
        });
    }
    
    _generarRutaImagen(imagen) {
        return imagen ? `../../../${config.storage_url}/${imagen}` : null;
    }
    
    
    

    _renderizarProductos(productos, gruposProductos, mostrarDetalle) {
        const productosHTML = this._formatearProductosHTML(productos, gruposProductos, mostrarDetalle);
        this.plantillaHTML = this.plantillaHTML.replace("{{Productos}}", productosHTML);
    }

    _renderizarResumenFinanciero() {
        this.plantillaHTML = this.plantillaHTML
            .replace("{{Valor de venta}}", this.resumenFinanciero.totalProductos.toFixed(2))
            .replace("{{IGV}}", this.resumenFinanciero.igv.toFixed(2))
            .replace("{{Valor de venta + IGV}}", this.resumenFinanciero.totalVenta.toFixed(2));
    }

    
    _formatearProductosHTML(productos,gruposProductos,mostrarDetalle) {
        throw new Error(`Este método debe ser implementado por una subclase. 
            Recibido: ${productos}
             ${gruposProductos}
             ${mostrarDetalle}`);

    }

    _obtenerResumenFinanciero(productos, conIGV) {

        const totalProductos = this._sumarPrecioTotal(productos);
        const igv = this._calcularIGV(totalProductos, conIGV);
        const totalVenta = totalProductos + igv;

        const totalProductosSoles = this._sumarPrecioTotal(productos, 'PEN');
        const igvSoles = this._calcularIGV(totalProductos, conIGV);
        const totalVentaSoles = totalProductos + igv;

        this.resumenFinanciero =  {
            totalProductos,
            igv,
            totalVenta,
            totalProductosSoles,
            igvSoles,
            totalVentaSoles
        };
    }


    _sumarPrecioTotal(productos, enSoles = false) {
        return productos.reduce((total, producto) => total + this._precioProductoIndividualTotal(producto,enSoles), 0);
    }

    _precioProductoIndividualTotal(producto,enSoles){
        throw new Error(`Este método debe ser implementado por una subclase. 
            Recibido: ${producto}, ${enSoles}`);
    }

    _calcularIGV(totalProductos, conIGV) {
        return conIGV ? totalProductos * 0.18 : 0;
    }

    _generarDescripcionProducto(producto) {
        const marca = GeneradorHTML.generarCampo("MARCA", producto.marca);
        const modelo = GeneradorHTML.generarCampo("MODELO", producto.modelo);
    
        return [marca, modelo].filter(Boolean).join("");
    }
    
    get igv(){
        if (!this.resumenFinanciero){
            return 0;
        }
        else{
            return this.resumenFinanciero.igv;
        }
        
    }

    get valorVenta(){
        if (!this.resumenFinanciero){
            return 0;
        }
        else{
            return this.resumenFinanciero.valorVenta;
        }
    }

    _ordenarProductos(productos, columna) {
        return productos.sort((a, b) => a[columna].localeCompare(b[columna]));

    }
    
    

}

