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
    

    @pytest.mark.django_db
    @patch("api.views.actualizarDataView.actualizarDatos")
    def test_actualizar_data_ok(mock_actualizar, client):
        mock_actualizar.return_value = [{"ok": True}]

        payload = {
            "nombreTabla": "Empresas",
            "columnas": [
                {
                    "descripcion": "Pepsi",
                    "precio": 5.5
                }
            ],
            "datosFiltro": [
                {
                    "tabla": "Empresas",
                    "columna": "TRAZA",
                    "operacion": "=",
                    "comparador": "10",
                    "siguienteOperacion": None
                }
            ]
        }

        response = client.post(
            reverse("actualizarDatos"),
            {"data": json.dumps(payload)}
        )

        assert response.status_code == 200
        body = response.json()

        # Se devolvió correctamente
        assert body["message"] == "Se actualizo correctamente"
        assert body["data"] == [{"ok": True}]

        # Asegura que actualizarDatos fue llamado correctamente
        mock_actualizar.assert_called_once_with(
            "Empresas",
            payload["columnas"],
            {"TRAZA": "10"}
        )

        