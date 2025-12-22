from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos
from ..utils.funcionesGenerales import enviar_respuesta
from ..services.authService import autenticarUsuario


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class ValidarUsuario(View):
    def post(self, request, *args, **kwargs):
        body = json.loads(request.body)  # <-- Aquí lees el JSON del body

        jsonRecibido = body.get('data')  # <-- Esto es tu objeto jsonUsuario

        validarCamposRequeridos(data=jsonRecibido)

        resultados = autenticarUsuario(jsonRecibido)

        return enviar_respuesta(
            data=resultados.get("data"),
            message=resultados.get("mensaje")
        )
    

    