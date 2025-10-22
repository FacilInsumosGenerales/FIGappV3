import pytest
from django.test import Client
from django.urls import reverse
import json
from unittest.mock import patch


@pytest.mark.django_db
class TestGuardarDataView:

    @pytest.fixture
    def client(self):
        return Client()
    

    @patch("api.views.guardarDataView.validarContenidoData")
    @patch("api.views.guardarDataView.guardarDatosNuevos")
    @patch("api.views.guardarDataView.validarCamposRequeridos")  
    def test_post_json_bienFormado(self, mock_guardar,mock_validar_campos, mock_validar_contenido, client):
        
        mock_guardar.return_value = {
            "id": 1,               
            "nombre": "Laptop"
        }
        

        data = {
            "nombreTabla": "productos",
            "columnas": [
                {"nombre": "nombre", "valor": "Laptop"},
                {"nombre": "precio", "valor": 4200}
            ]
        }

        data2 = {
            "nombreTabla":"empresas",
            "informacionColumnas":[
                {
                    "Nombre":"Francis",
                    "Proveedor":"1",
                    "Cliente":"1",
                    "Logistica":"1",
                    "RUC":"Prueba",
                    "Telefono":"123",
                    "Pagina_Web":"google.com",
                    "Forma_de_pago":"tarjeta de credito",
                    "Favorito":"1",
                    "Ediciones":"2025-10-21 15:04:39, Francis Suarez Carrizales , registró en el sistema la empresa: Francis."
                }
            ]
        }
        
        url = reverse("guardarDatos")

        respuesta = client.post(url, {
            "data": json.dumps(data),
            "usuario": "admin"
        })

        assert respuesta.status_code == 200 
        json_resp = respuesta.json()
        
        assert json_resp['message'] == "Datos guardados correctamente"
        assert json_resp['data'] == {"id": 1, "nombre": "Laptop"}
        
        mock_guardar.assert_called_once_with("productos", data['columnas'])
        mock_validar_campos.assert_called_once()
        mock_validar_contenido.assert_called_once()
        
        
