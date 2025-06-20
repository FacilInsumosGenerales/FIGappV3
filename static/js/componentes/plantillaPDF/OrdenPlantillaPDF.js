import { convertirFechaISO } from "../../utils/date_utils.js";
import { BasePlantillaPDF, GeneradorHTML, PLANTILLA_FILA_PRODUCTO } from "./BasePlantillaPDF.js";

export class OrdenPlantillaPDF extends BasePlantillaPDF {
    constructor(plantillaHTML) {
        super(plantillaHTML);
    }

    _llenarEncabezado(datos){
        this.plantillaHTML = this.plantillaHTML
        .replace('{{Proveedor}}', datos.proveedor)
        .replace('{{Nombre Contacto}}', `${datos.contacto}`)
        .replace('{{RUC}}', datos.ruc)
        .replace('{{Celular}}', datos.celular)
        .replace('{{Email}}', datos.email)
        .replace('{{Forma de pago}}', datos.formaPago)
        .replace('{{Fecha}}', datos.fecha)
        .replace('{{Moneda}}', datos.moneda)
        .replace('{{Numero De OC}}', datos.numeroOC)
        .replace('{{Direccion de entrega}}', datos.lugarDespacho)
        .replace('{{Observaciones}}', datos.observaciones)
        .replace('{{Garantia}}', datos.garantia);

        console.log("Plantilla actualizada:", this.plantillaHTML); // Depuración

    }

    _formatearProductosHTML(productos,ignorarParametroHeredado) {

        return productos.map(producto => this._renderizarPlantillaProducto(producto)).join("");
        
    }

    _renderizarPlantillaProducto(producto){
        return PLANTILLA_FILA_PRODUCTO
        .replace("{TITULO}", producto.descripcionProveedor)
        .replace("{DESCRIPCION}", this._generarDescripcionProducto(producto))
        .replace("{IMAGENES}", GeneradorHTML.generarImagen(producto.imagen))
        .replace("{MEDIDA}", producto.medida)
        .replace("{CANTIDAD}", producto.cantidad)
        .replace("{ENTREGA}", convertirFechaISO (producto.diasEntregaProveedor,false))
        .replace("{PRECIO_UNIDAD}", producto.costoXUnidadProveedor)
        .replace("{PRECIO_TOTAL}", this._precioProductoIndividualTotal(producto).toFixed(2));
    }

    _precioProductoIndividualTotal(producto, enSoles=false){
        const cantidad = parseFloat(producto.cantidad);
        let precio = parseFloat(enSoles ? producto.costoXUnidadProveedorSoles : producto.costoXUnidadProveedor);
        return cantidad*precio;
    }

}


