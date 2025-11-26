from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos, validarContenidoData
from ..services.dataService import actualizarDatos


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class ActualizarDataView(View):
    def put(self, request, *args, **kwargs):

        jsonRecibido = request.PUT.get('data')
        validarCamposRequeridos(data=jsonRecibido)
        jsonInterpretado = json.loads(jsonRecibido)

        validarContenidoData(jsonInterpretado, ['nombreTabla', 'columnas','datosFiltro'])

        columnas = jsonInterpretado.get('columnas')
        nombreTabla = jsonInterpretado.get('nombreTabla')
        traza = jsonInterpretado.get('datosFiltro')[0].get("comparador")

        resultado = actualizarDatos(nombreTabla, columnas, {'TRAZA': traza})

        return JsonResponse({"message": "Se actualizo correctamente","data": resultado})
    
