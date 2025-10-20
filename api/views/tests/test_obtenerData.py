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

    def test_get_json_completo(self, client):
        data = {
            "nombreTabla": "contactos",
            "informacionColumnas": ["nombre", "email", "telefono"],
            "tablaJoins": [
                {"tabla": "direcciones", "on": "contactos.id = direcciones.contacto_id"}
            ],
            "datosFiltro": [
                {"columna": "activo", "operador": "=", "valor": 1}
            ],
            "groupby": ["pais"],
            "having": [
                {"columna": "count_id", "operador": ">", "valor": 10}
            ],
            "orderby": ["nombre ASC", "email DESC"]
        }

        url = reverse("obtenerDatos")

        