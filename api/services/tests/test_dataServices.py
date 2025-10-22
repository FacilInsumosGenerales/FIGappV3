import pytest
from api.services.dataService import guardarDatosNuevos
from api.models.otros import TablaPrueba
from api.errores.excepciones import BaseAppException


@pytest.mark.django_db
def test_guardar_datos_nuevos_sin_modelo_sin_columnas():
    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevos(None, None)

    error = exc_info.value
    assert error.codigo == "E100"

    # Ejemplo de un error 
    # Error al ejecutar el procedimiento almacenado: {detail}. 
    # Detalle: Error al ejecutar la consulta: not enough values to unpack (expected 2, got 1)

    assert "Error al ejecutar el procedimiento almacenado: " in error.mensaje
    assert error.estado == 500

@pytest.mark.django_db
def test_guardar_datos_nuevos_sin_modelo_con_columnas():
    columnas = {
        "descripcion": "Borrador", 
        "codigoBarra": "123",
        "stock": 10,
        "anaquel": 1,
        "fechaIngreso": "2025-10-17 09:30:00",
        "fechaModificacion": "2025-10-18 09:30:00",
        "precio": 5.3,
        "ediciones": "2025-10-17 09:30:00, Francis Suarez Carrizales, registró en el sistema el producto."
    }

    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevos("ModeloInexistente", columnas)

    error = exc_info.value
    assert error.codigo == "E100"
    assert "Error al ejecutar el procedimiento almacenado: " in error.mensaje
    assert error.estado == 500

@pytest.mark.django_db 
def test_guardar_datos_nuevos_con_modelo_sin_columnas():
    nombreTabla = "TablaPrueba"

    # Esperamos que falle porque `datos_dict` es None
    with pytest.raises(BaseAppException) as exc_info:
        guardarDatosNuevos(nombreTabla, None)

    error = exc_info.value
    assert error.codigo == "E100"
    assert "Error al ejecutar el procedimiento almacenado: " in error.mensaje
    assert error.estado == 500  # Por defecto, si no hay status en el catálogo

@pytest.mark.django_db 
def test_guardar_datos_nuevos_con_modelo_con_columnas():
    nombreTabla = "TablaPrueba"
    columnas = {
        "TRAZA": 1,
        "descripcion": "Borrador", 
        "codigoBarra": "123",
        "stock": 10,
        "anaquel": 1,
        "fechaIngreso": "2025-10-17 09:30:00",
        "fechaModificacion": "2025-10-18 09:30:00",
        "precio": 5.3,
        "ediciones": "2025-10-17 09:30:00, Francis Suarez Carrizales, registró en el sistema el producto."
    }
    
    resultado = guardarDatosNuevos(nombreTabla,columnas)

    assert resultado == columnas
    assert TablaPrueba.objects.filter(descripcion="Borrador").exists()

