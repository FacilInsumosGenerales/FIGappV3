from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..utils.decoradores import manejarErroresVista
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.authService import cambiarClave

@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class CambiarClaveUsuario(View):
    def post(self, request, *args, **kwargs):
        usuario = request.POST.get('usuario')
        clave = request.POST.get('clave')

        respuesta = cambiarClave(usuario,clave)

        if(respuesta["success"]):
            return enviar_respuesta(data=respuesta, message=respuesta['mensaje'])
        else:
            return enviar_respuesta(data=[], message="No se pudo cambiar")

