import pytest
from api.services.dataService import guardarDatosNuevosNuevo
from api.models.otros import TablaPrueba
from api.errores.excepciones import BaseAppException


@pytest.mark.django_db
def test_guardar_datos_nuevos_sin_modelo_sin_columnas():
    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevosNuevo(None, None)

    error = exc_info.value
    assert error.codigo == "E100"
    assert "Model name must be a string" in error.mensaje
    assert error.estado == 400

@pytest.mark.django_db
def test_guardar_datos_nuevos_sin_modelo_con_columnas():
    columnas = {
        "descripcion": "Borrador", 
        "codigoBarra": "123",
        "stock": 10,
        "anaquel": 1,
        "fechaIngreso": "2025-10-17T09:30:00",
        "fechaModificacion": "2025-10-18T09:30:00",
        "precio": 5.3,
        "ediciones": "2025-10-17 09:30:00, Francis Suarez Carrizales, registró en el sistema el producto."
    }

    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevosNuevo("ModeloInexistente", columnas)

    error = exc_info.value
    assert error.codigo == "E004"
    assert "No se encontró el modelo" in error.mensaje
    assert error.estado == 400

@pytest.mark.django_db 
def test_guardar_datos_nuevos_con_modelo_sin_columnas():
    nombreTabla = "TablaPrueba"

    # Esperamos que falle porque `datos_dict` es None
    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevosNuevo(nombreTabla, None)

    error = exc_info.value
    assert error.codigo == "E100"
    assert "Error al ejecutar la consulta" in error.mensaje
    assert error.estado == 400  # Por defecto, si no hay status en el catálogo

@pytest.mark.django_db 
def test_guardar_datos_nuevos_con_modelo_con_columnas():
    nombreTabla = "TablaPrueba"
    columnas = {
        "descripcion": "Borrador", 
        "codigoBarra": "123",
        "stock": 10,
        "anaquel": 1,
        "fechaIngreso": "2025-10-17T09:30:00",
        "fechaModificacion": "2025-10-18T09:30:00",
        "precio": 5.3,
        "ediciones": "2025-10-17 09:30:00, Francis Suarez Carrizales, registró en el sistema el producto."
        }
    
    resultados = guardarDatosNuevosNuevo(nombreTabla,columnas)

    assert resultados['mensaje'] == "Datos guardados correctamente"
    assert TablaPrueba.objects.filter(descripcion="Borrador").exists()

