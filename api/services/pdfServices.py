from weasyprint import HTML
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from ..errores.handle import raise_error
from .fileService import guardarPdfTemplateEnS3
from django.conf import settings


TEMPLATE_MAP = {
    "cotizacion": "cotizacion.html",
    "orden": "ocproveedor.html"
}

def generarPdf(data: dict) -> str:
    print(HTML)
    tipo = data.get("tipo")

    if tipo not in TEMPLATE_MAP:
        raise_error("E601", f"Tipo de documento invalido")

    templateName = TEMPLATE_MAP[tipo]

    context = construirContextoCotizacion(data)
    print("construyo el contexto")
    htmlString = render_to_string(templateName, context)
    print("renderizo a string")
    pdf_bytes = HTML(
        string=htmlString,
        base_url=str(settings.BASE_DIR)
    ).write_pdf()
    print("genero")
    ## url = guardarPdfTemplateEnS3(pdf_bytes, data)
    print(pdf_bytes)
    return pdf_bytes

def construirContextoCotizacion(data):
    cotizacion = data.get("cotizacion", {})
    cliente = data.get("cliente", {})
    resumen = data.get("resumen", {})

    contexto = {
        "cotizacion": {
            "numeroCotizacion": cotizacion.get("numeroCotizacion", ""),
            "requerimiento": cotizacion.get("requerimiento",""),
            "fecha": cotizacion.get("fecha",""),
            "validez": cotizacion.get("validez",""),
            "moneda": cotizacion.get("moneda",""),
            "direccionEntrega": cotizacion.get("direccionEntrega",""),
            "formaPago": cotizacion.get("formaPago",""),
            "observacion": cotizacion.get("observacion",""),
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
                "descripcion": producto.get("descripcion",""),
                "tiempoEntrega": producto.get("tiempoEntrega",""),
                "unidadMedida": producto.get("unidadMedida",""),
                "cantidad": producto.get("cantidad",""),
                "valorUnitario": producto.get("valorUnitario",""),
                "Importe": producto.get("Importe",""),
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

