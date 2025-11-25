from django.contrib.auth.hashers import check_password
from api.models import Usuarios  # Ajusta al nombre de tu modelo y app

def autenticarUsuario(jsonInterpretado):
    clave = jsonInterpretado['datosFiltro'][0]['comparador']
    usuario = jsonInterpretado['datosFiltro'][1]['comparador']

    try:
        Usuario = Usuarios.objects.get(usuario=usuario)
    except Usuario.DoesNotExist:
        return {
            "es_usuario": False,
            "data": None,
            "mensaje": "Usuario o contraseña incorrectos"
        }

    if not check_password(clave, Usuario.clave):
        return {
            "es_usuario": False,
            "data": None,
            "mensaje": "Usuario o contraseña incorrectos"
        }

    return {
        "esUsuario": True,
        "data": {
            "id": usuario.id,
            "username": usuario.username,
            "email": usuario.email
        },
        "mensaje": "Autenticación exitosa"
    }

