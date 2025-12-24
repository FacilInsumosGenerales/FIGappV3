import pytest
from api.errores.handle import raise_error
from api.errores.excepciones import BaseAppException


def test_raise_error_sin_codigo_sin_mensaje_extra_sin_param():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error()
    
    exc = exc_info.value
    assert exc.codigo == "E999"
    assert "Error desconocido" in exc.mensaje
    assert exc.estado == 500

def test_raise_error_con_codigo_sin_mensaje_extra_sin_param():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error("E001")
    
    exc = exc_info.value
    assert exc.codigo == "E001"
    assert "El parámetro '{param}' está vacío o ausente." in exc.mensaje
    assert exc.estado == 400

def test_raise_error_codigo_existente_con_mensaje_extra_sin_param():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error("E001", extra_message="Error con detalle")
    
    exc = exc_info.value
    assert exc.codigo == "E001"
    assert "El parámetro '{param}' está vacío o ausente.. Detalle: Error con detalle" in exc.mensaje
    assert exc.estado == 400

def test_raise_error_codigo_existente_con_mensaje_extra_con_param():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error("E001", extra_message="Error con detalle",param="usuario")
    
    exc = exc_info.value
    print(exc)
    assert exc.codigo == "E001"
    assert "El parámetro 'usuario' está vacío o ausente.. Detalle: Error con detalle" in exc.mensaje
    assert exc.estado == 400

def test_raise_error_codigo_existente_sin_mensaje_extra_con_param():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error("E001", param="usuario")
    
    exc = exc_info.value
    print(exc)
    assert exc.codigo == "E001"
    assert "El parámetro 'usuario' está vacío o ausente." in exc.mensaje
    assert exc.estado == 400

def test_raise_error_codigo_desconocido():
    with pytest.raises(BaseAppException) as exc_info:
        raise_error("CODIGO_INEXISTENTE")
    
    exc = exc_info.value
    assert exc.codigo == "CODIGO_INEXISTENTE"
    assert "Error desconocido" in exc.mensaje
    assert exc.estado == 500

