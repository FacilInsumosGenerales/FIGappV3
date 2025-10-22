from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..services.queryService import construirQuery
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos
from urllib.parse import unquote
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class ObtenerDataView(View):
    def get(self, request, *args, **kwargs):
        print(1)
        jsonRecibido = request.GET.get('data')
        print(jsonRecibido)

        validarCamposRequeridos(data=jsonRecibido)
        print("paso validacion")

        jsonInterpretado = json.loads(jsonRecibido)
        print("interpreto")
        print(jsonInterpretado)

        resultados = construirQuery(jsonInterpretado)
        
        return enviar_respuesta(data=resultados, message="Informacion obtenida con exito")

