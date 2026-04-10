from django.db import connection
from datetime import date
import requests
from ..models.otros import TipoDeCambio

def actualizarTipoCambio():
    resultado = obtenerTipoCambioSunat()
    operacionExitosa = validarDatosObtenidos(resultado)
    if not operacionExitosa:
        resultado = {
            "fecha": date.today(),
            "compra": 3.60,
            "venta": 3.60,
            "moneda": "USD",
            "fuente": "SISTEMA"
        }

    guardarEnTabla(resultado)
    return resultado
        
def obtenerTipoCambioSunat():
    url = "https://api.apis.net.pe/v1/tipo-cambio-sunat"

    try:
        r = requests.get(url, timeout=10)

        if r.status_code != 200:
            return None

        data = r.json()

        return {
            "fecha": date.today(),
            "compra": data.get("compra"),
            "venta": data.get("venta"),
            "moneda": data.get("moneda"),
            "fuente": "APISUNAT"
        }

    except requests.exceptions.RequestException:
        return None

def validarDatosObtenidos(resultado):
    if not resultado:
        return False

    return all([
        resultado.get("fecha"),
        resultado.get("compra"),
        resultado.get("venta"),
        resultado.get("moneda")
    ])

def guardarEnTabla(resultado):
    TipoDeCambio.objects.update_or_create(
        moneda=2,
        fecha=resultado["fecha"],
        defaults={
            "compra": resultado["compra"],
            "venta": resultado["venta"],
            "fuente": resultado["fuente"]
        }
        
    )
    
def obtenerTipoCambio():
    tipo = TipoDeCambio.objects.filter(
        moneda=2
    ).order_by('-fecha').first()

    return {
        "fecha": tipo.fecha,
        "compra": tipo.compra,
        "venta": tipo.venta,
        "moneda": "USD",
        "fuente": tipo.fuente
    }

