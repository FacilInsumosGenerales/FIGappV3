from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..services.queryService import armarCallParaProcedimiento
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class EjecutarProcedimiento(View):
    def get(self, request, *args, **kwargs):
        procedimiento = request.GET.get('procedimientoConFiltros')
        jsonRecibido = request.GET.get('data')

        validarCamposRequeridos(data=jsonRecibido)

        jsonInterpretado = json.loads(jsonRecibido)

        resultados = armarCallParaProcedimiento(jsonInterpretado,procedimiento)
        
        return enviar_respuesta(data=resultados, message="Informacion obtenida con exito")

