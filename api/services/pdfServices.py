from weasyprint import HTML
from django.template.loader import render_to_string
from ..services.fileService import procesarSubidaArchivo
from ..errores.handle import raise_error
from django.conf import settings
import re
from ..models.procesos import DatosGeneralesDeCotizaciones, DatosGeneralesOrdenCompraAProveedores


TEMPLATE_MAP = {
    "cotizacion": "cotizacion.html",
    "orden": "ocproveedor.html"
}

def generarPdfCotizacion(data):
    pdf = generarPdf(data)
    url = procesarSubidaArchivo(pdf)

    actualizarDocumento(data,url)
    return url

def generarPdf(data: dict) -> str:
    tipo = data.get("tipo")
    documento = data.get("documento")

    if tipo not in TEMPLATE_MAP:
        raise_error("E601", f"Tipo de documento invalido")

    templateName = TEMPLATE_MAP[tipo]

    if tipo == "cotizacion":
        data["productos"] = ordenarProductos(
            data.get("productos", []),
            documento.get("orden", "ALFABETICO")
        )
        context = construirContextoCotizacion(data)

    elif tipo == "orden":
        context = construirContextoOrden(data)

    htmlString = render_to_string(templateName, context)

    pdf_bytes = HTML(
        string=htmlString,
        base_url=str(settings.BASE_DIR)
    ).write_pdf()

    return pdf_bytes

def construirContextoCotizacion(data):
    cotizacion = data.get("documento", {})
    cliente = data.get("tercero", {})
    resumen = data.get("resumen", {})

    bucket = "https://bucket533462777573.s3.us-east-2.amazonaws.com/"

    contexto = {
        "cotizacion": {
            "numeroCotizacion": cotizacion.get("numeroCotizacion", ""),
            "requerimiento": cotizacion.get("requerimiento",""),
            "fecha": cotizacion.get("fecha",""),
            "validez": cotizacion.get("validez",""),
            "moneda": cotizacion.get("moneda",""),
            "direccionEntrega": cotizacion.get("direccionEntrega",""),
            "formaPago": cotizacion.get("formaPago",""),
            "observacion": limpiarTexto(cotizacion.get("observacion","")),
        },
        "cliente": {
            "empresa": cliente.get("empresa",""),
            "ruc": cliente.get("ruc",""),
            "contacto": cliente.get("contacto", ""),
            "celular": cliente.get("celular",""),
            "email": cliente.get("email",""),

        },
        "productos": [
            {
                "descripcion": limpiarTexto(producto.get("descripcionCliente","")),
                "marca": limpiarTexto(producto.get("marca","")),
                "modelo": limpiarTexto(producto.get("modelo","")),
                "imagen": bucket + producto["imagen"] if producto.get("imagen") else "",
                "tiempoEntrega": producto.get("diasEntregaCliente",""),
                "unidadMedida": producto.get("medida",""),
                "cantidad": producto.get("cantidad",""),
                "valorUnitario": producto.get("precioXUnidadCliente",""),
                "importe": producto.get("importe",""),
            }
            for producto in data.get("productos",[])
        ],
        "resumen": {
            "subTotal": resumen.get("subTotal",""),
            "igv": resumen.get("igv",""),
            "total": resumen.get("total",""),
        }
    }

    return contexto

def limpiarTexto(texto):
    if not texto:
        return ""

    # Normaliza saltos (Windows, Linux, etc.)
    texto = texto.replace('\r\n', '\n').replace('\r', '\n')

    # Limpia espacios excesivos (pero no rompe líneas)
    texto = re.sub(r'[ \t]+', ' ', texto)

    return texto.strip()

def actualizarDocumento(data,url):
    tipo = data.get("tipo")

    if(tipo == "cotizacion"):
        cotizacion_id = data.get("documento", {}).get("traza")
        subTotal = data.get("resumen", {}).get("subTotal")
        igv = data.get("resumen", {}).get("igv")
        DatosGeneralesDeCotizaciones.objects.filter(
            TRAZA=cotizacion_id
        ).update(
            archivo=url,
            valorDeVenta=subTotal,
            igv=igv
        )

    elif(tipo == "orden"):
        orden_id = data.get("documento", {}).get("traza")
        subTotal = data.get("resumen", {}).get("subTotal")
        igv = data.get("resumen", {}).get("igv")
        DatosGeneralesOrdenCompraAProveedores.objects.filter(
            TRAZA=orden_id
        ).update(
            ocPdf=url,
            valorDeCompra=subTotal,
            igv=igv
        )

def construirContextoOrden(data):
    orden = data.get("documento", {})
    proveedor = data.get("tercero", {})
    resumen = data.get("resumen", {})

    bucket = "https://bucket533462777573.s3.us-east-2.amazonaws.com/"

    contexto = {
        "orden": {
            "numeroOrden": orden.get("numeroOrden", ""),
            "requerimiento": orden.get("requerimiento",""),
            "fecha": orden.get("fecha",""),
            "validez": orden.get("validez",""),
            "moneda": orden.get("moneda",""),
            "direccionEntrega": orden.get("direccionEntrega",""),
            "formaPago": orden.get("formaPago",""),
            "observacion": limpiarTexto(orden.get("observacion",""))
        },
        "proveedor": {
            "empresa": proveedor.get("empresa",""),
            "ruc": proveedor.get("ruc",""),
            "contacto": proveedor.get("contacto", ""),
            "celular": proveedor.get("celular",""),
            "email": proveedor.get("email","")
        },
        "productos": [
            {
                "descripcion": limpiarTexto(producto.get("descripcionProveedor","")),
                "marca": limpiarTexto(producto.get("marca","")),
                "modelo": limpiarTexto(producto.get("modelo","")),
                "imagen": bucket + producto["imagen"] if producto.get("imagen") else "",
                "fechaEntregaMaxima": producto.get("fechaEntregaProveedor",""),
                "unidadMedida": producto.get("medida",""),
                "cantidad": producto.get("cantidad",""),
                "valorUnitario": producto.get("costoXUnidadProveedor",""),
                "importe": producto.get("importe",""),
            }
            for producto in data.get("productos",[])
        ],
        "resumen": {
            "subTotal": resumen.get("subTotal",""),
            "igv": resumen.get("igv",""),
            "total": resumen.get("total","")
        }
    }

    return contexto

def ordenarProductos(productos, tipoOrden):
    if tipoOrden == "ALFABETICO":
        return sorted(productos, key=lambda x: x.get("descripcionCliente", "").lower())

    elif tipoOrden == "TRAZA":
        return sorted(productos, key=lambda x: x.get("TRAZA", 0))

    elif tipoOrden == "PERSONALIZADO":
        ## return sorted(productos, key=lambda x: x.get("orden", 0)) TODO: AUN NO SE IMPLEMENTA ESA COLUMNA EN LA TABLA
        return sorted(productos, key=lambda x: x.get("descripcionCliente", "").lower())

    return productos  # fallback