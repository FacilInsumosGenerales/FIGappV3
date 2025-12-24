from api.models import Usuarios
from django.contrib.auth.hashers import check_password, make_password


def autenticarUsuario(jsonInterpretado):
    clave = jsonInterpretado['datosFiltro'][0]['comparador'].strip()
    usuario = jsonInterpretado['datosFiltro'][1]['comparador'].strip()

    try:
        usuario_obj = Usuarios.objects.get(usuario=usuario)
    except Usuarios.DoesNotExist:
        return {
            "esUsuario": False,
            "data": None,
            "mensaje": "Usuario o contraseña incorrectos"
        }

    hash_db = usuario_obj.password

    if hash_db.startswith("pbkdf2_"):
        if not check_password(clave, hash_db):
            return {
                "esUsuario": False,
                "mensaje": "Usuario o contraseña incorrectos",
                "data": None
            }

    else:
        return {
            "esUsuario": False,
            "mensaje": "Formato de hash no soportado",
            "data": None
        }

    return {
        "esUsuario": True,
        "data": {
            "TRAZA": usuario_obj.TRAZA,
            "username": usuario_obj.usuario,
            "email": usuario_obj.email,
            "nombre": usuario_obj.nombre,
            "apellido": usuario_obj.apellido
        },
        "mensaje": "Autenticación exitosa"
    }

def cambiarClave(usuario, clave):

    usuarioObj = Usuarios.objects.get(usuario=usuario)
    usuarioObj.password = make_password(clave)
    usuarioObj.save()

    return {
        "success": True,
        "mensaje": "Contraseña actualizada correctamente",
        "data": {
            "usuario": usuarioObj.usuario,
            "TRAZA": usuarioObj.TRAZA
        }
    }


