import { BasePlantillaPDF, GeneradorHTML, PLANTILLA_FILA_PRODUCTO } from "./BasePlantillaPDF.js";

export class CotizacionPlantillaPDF extends BasePlantillaPDF {
    constructor(plantillaHTML) {
        super(plantillaHTML);
    }

    _llenarEncabezado(datos){
        this.plantillaHTML = this.plantillaHTML
            .replace("{{Cliente}}", datos.cliente)
            .replace("{{Nombre Contacto}}", `${datos.contactoNombre} ${datos.contactoApellido || ""}`)
            .replace("{{RUC}}", datos.ruc)
            .replace("{{Celular}}", datos.celular)
            .replace("{{Email}}", datos.email)
            .replace("{{Cod Req}}", datos.codReq)
            .replace("{{Forma De Pago}}", datos.formaPago)
            .replace("{{Fecha}}", datos.fecha)
            .replace("{{Validez}}", datos.validez)
            .replace("{{Moneda}}", datos.moneda)
            .replace("{{Numero De Cotizacion}}", datos.numeroCotizacion)
            .replace("{{Direccion de despacho}}", datos.lugarDespacho)
            .replace("{{Observaciones}}", datos.observaciones);
    }

    _formatearProductosHTML(productos,gruposProductos,mostrarDetalle) {

        const productosAgrupados = this._agruparProductos(productos,gruposProductos,mostrarDetalle);

        const productosOrdenados = this._ordenarProductos(productosAgrupados,'titulo');

        return productosOrdenados.map(producto => this._renderizarPlantillaProducto(producto)).join("");
        
    }

    _agruparProductos(productos, gruposProductos, mostrarDetalle) {
        const productosAgrupados = this._organizarPorGrupo(productos, gruposProductos);
    
        return productosAgrupados.map(grupo => this._crearResumenGrupo(grupo, mostrarDetalle));
    }
    
    _organizarPorGrupo(productos, gruposProductos) {
        const agrupados = {};
    
        productos.forEach(producto => {
            const grupoID = producto.grupo;
            if (!grupoID) {
                agrupados[producto.descripcionCliente] = { productos: [producto], esIndividual: true };
                return;
            }
    
            if (!agrupados[grupoID]) {
                agrupados[grupoID] = { productos: [], grupoInfo: this._encontrarGrupo(gruposProductos,grupoID), esIndividual: false };
            }
    
            agrupados[grupoID].productos.push(producto);
        });
    
        return Object.values(agrupados);
    }

    _encontrarGrupo(grupos,grupoID){
        return grupos.find(grupo => grupo.descripcion === grupos[grupoID]);
    }
    
    _crearResumenGrupo(grupo, mostrarDetalle) {
        if (grupo.esIndividual) {
            return this._crearResumenProducto(grupo.productos[0]);
        }
    
        const { productos, grupoInfo } = grupo;
        const cantidadTotal = grupoInfo.Cantidad;
        const precioTotal = productos.reduce((sum, p) => sum + (p.precioXUnidadCliente * p.cantidad), 0);
        const diasEntrega = Math.max(...productos.map(p => p.diasEntregaProveedor));
    
        return {
            titulo: grupoInfo.Descripcion,
            medida: grupoInfo.Medida,
            cantidad: cantidadTotal,
            diasEntrega: diasEntrega,
            precioTotal: precioTotal.toFixed(2),
            precioUnidad: (precioTotal / cantidadTotal).toFixed(2),
            descripcion: mostrarDetalle ? this._generarDescripcionGrupo(productos, cantidadTotal) : '',
            imagenes: this._generarImagenesGrupo(productos)
        };
    }
    
    _crearResumenProducto(producto) {
        return {
            titulo: producto.descripcionCliente,
            descripcion:this._generarDescripcionProducto(producto),
            medida: producto.medida,
            cantidad: producto.cantidad,
            diasEntrega: producto.diasEntregaCliente,
            precioTotal: (parseFloat(producto.precioXUnidadCliente) * parseFloat(producto.cantidad)).toFixed(2),
            precioUnidad: producto.precioXUnidadCliente = Number(producto.precioXUnidadCliente).toFixed(2),
            imagenes: GeneradorHTML.generarImagen(producto.imagen)
        };
    }
    
    _generarDescripcionGrupo(productos, cantidadGrupo) {
        return productos.map(producto => {
            const cantidadPorGrupo = (producto.cantidad / cantidadGrupo).toFixed(2);
            const marca = producto.Marca ? ` MARCA: ${producto.Marca}` : '';
            const modelo = producto.Modelo ? ` MODELO: ${producto.Modelo}` : '';
    
            return `<li class="c18 c69 li-bullet-0">
                        <span class="c0">
                            ${cantidadPorGrupo} ${producto.medida} ${producto.descripcionCliente}
                            ${marca}${modelo}
                        </span>
                    </li>`;
        }).join('');
    }
    
    _generarImagenesGrupo(productos) {
        return productos.map(producto => GeneradorHTML.generarImagen(producto.imagen)).join('');
    }
    
    

    _renderizarPlantillaProducto(producto){
        return PLANTILLA_FILA_PRODUCTO
        .replace("{TITULO}", producto.titulo)
        .replace("{DESCRIPCION}", producto.descripcion)
        .replace("{IMAGENES}", producto.imagenes)
        .replace("{MEDIDA}", producto.medida)
        .replace("{CANTIDAD}", producto.cantidad)
        .replace("{ENTREGA}", `${producto.diasEntrega} día(s)`)
        .replace("{PRECIO_UNIDAD}", producto.precioUnidad)
        .replace("{PRECIO_TOTAL}", producto.precioTotal);
    }

    _precioProductoIndividualTotal(producto,enSoles){
        const cantidad = parseFloat(producto.cantidad);
        
        let precio = parseFloat(enSoles ? producto.precioXUnidadClienteSoles : producto.precioXUnidadCliente);

        return cantidad*precio;
    }
    
}
