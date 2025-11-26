from api.models import Usuarios
from passlib.hash import bcrypt
from django.contrib.auth.hashers import make_password

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

    print(usuario_obj.password)
    print(clave)

    # Usamos la función genérica
    if not verificarPasswordPhp(clave, usuario_obj.password):
        return {
            "esUsuario": False,
            "data": None,
            "mensaje": "Usuario o contraseña incorrectos"
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

def verificarPasswordPhp(clave, hash_php):
    """
    Verifica una contraseña en texto plano contra un hash generado por PHP.
    Devuelve True si coinciden, False si no.
    """
    try:
        return bcrypt.verify(clave, hash_php)
    except ValueError:
        # Esto captura errores de formato o salt inválido
        return False
    
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


