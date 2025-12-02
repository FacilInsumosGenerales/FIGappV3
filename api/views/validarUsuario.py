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
    def get(self, request, *args, **kwargs):
        print(1)
        jsonRecibido = request.GET.get('data')
        
        validarCamposRequeridos(data=jsonRecibido)

        jsonInterpretado = json.loads(jsonRecibido)

        resultados = autenticarUsuario(jsonInterpretado)
        print(resultados)
        if(resultados["esUsuario"]):
            return enviar_respuesta(data=resultados["data"], message=resultados["mensaje"])
        else:
            return enviar_respuesta(data=resultados["data"], message=resultados["mensaje"])

