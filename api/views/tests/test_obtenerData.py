import pytest
from django.test import Client
from django.urls import reverse


@pytest.mark.django_db
class TestObtenerDatosView:
    @pytest.fixture
    def client(self):
        return Client()
    
    def test_get_json_malformado(self, client):
        data = '{"nombreTabla":, "informacionColumnas":}'
        
        url = reverse("obtenerDatos")

        respuesta = client.get(url, data={"data": data})

        json_resp = respuesta.json()

        assert respuesta.status_code == 500 
        assert  json_resp['error_code'] == "E500"
        assert "Error en codigo" in json_resp["message"] or "JSONDecodeError" in json_resp["message"]

## TODO: Armar un JSON adecuado para realizar los test, preferible que lo genere el sistema
""" 
    def test_get_json_completo(self, client):
        data = {
            "nombreTabla": "contactos",
            "informacionColumnas": {
                "contactos.TRAZA": "",
                "contactos.nombre": "",
                "emp.nombre": ""
            },
            "tablaJoins": [
                {
                    "tipoRelacion": "INNER",
                    "nombreTablaIzquierda": "empresas",
                    "nombreTablaIzquierdaAlias": "emp",
                    "nombreTablaDerecha": "contactos",
                    "campoIzquierda": "id",
                    "campoDerecha": "contacto_id"
                }
            ],
            "datosFiltro": [
                {
                    "tabla": "c",
                    "columna": "activo",
                    "operacion": "=",
                    "comparador": "1",
                    "siguienteOperacion": NULL
                }
            ],
            "groupby": [
                {"tabla": "c", "columna": "pais"}
            ],
            "having": [
                {"columna": "COUNT(id)", "operacion": ">", "comparador": "10"}
            ],
            "orderby": [
                {"tabla": "c", "columna": "nombre", "orden": "ASC"}
            ]
        }

        url = reverse("obtenerDatos")
 """
        

        