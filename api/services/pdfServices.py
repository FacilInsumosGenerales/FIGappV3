from weasyprint import HTML
from django.template.loader import render_to_string
from ..services.fileService import procesarSubidaArchivo
from ..errores.handle import raise_error
from django.conf import settings
import re
from ..models.procesos import DatosGeneralesDeCotizaciones


TEMPLATE_MAP = {
    "cotizacion": "cotizacion.html",
    "orden": "ocproveedor.html"
}

def generarPdfCotizacion(data):
    pdf = generarPdf(data)
    url = procesarSubidaArchivo(pdf)
    actualizarCotizacion(data,url)
    return url

def generarPdf(data: dict) -> str:
    tipo = data.get("tipo")

    if tipo not in TEMPLATE_MAP:
        raise_error("E601", f"Tipo de documento invalido")

    templateName = TEMPLATE_MAP[tipo]

    context = construirContextoCotizacion(data)

    htmlString = render_to_string(templateName, context)

    pdf_bytes = HTML(
        string=htmlString,
        base_url=str(settings.BASE_DIR)
    ).write_pdf()

    return pdf_bytes

def construirContextoCotizacion(data):
    cotizacion = data.get("cotizacion", {})
    cliente = data.get("cliente", {})
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
                "tiempoEntrega": producto.get("tiempoEntrega",""),
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

    # Reduce múltiples saltos a solo uno
    texto = re.sub(r'\n+', '\n', texto)

    # Limpia espacios excesivos (pero no rompe líneas)
    texto = re.sub(r'[ \t]+', ' ', texto)

    return texto.strip()

def actualizarCotizacion(data,url):
    cotizacion_id = data.get("cotizacion", {}).get("traza")
    DatosGeneralesDeCotizaciones.objects.filter(
        TRAZA=cotizacion_id
    ).update(
        archivo=url
    )
