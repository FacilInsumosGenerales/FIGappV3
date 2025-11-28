from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos, validarContenidoData
from ..services.dataService import actualizarDatos
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class ActualizarDataView(View):
    def post(self, request, *args, **kwargs):
        print(1)
        jsonRecibido = request.POST.get('data')
        validarCamposRequeridos(data=jsonRecibido)
        jsonInterpretado = json.loads(jsonRecibido)

        validarContenidoData(jsonInterpretado, ['nombreTabla', 'informacionColumnas','datosFiltro'])
        
        columnas = jsonInterpretado.get('informacionColumnas')
        nombreTabla = jsonInterpretado.get('nombreTabla')
        traza = jsonInterpretado.get('datosFiltro')[0].get("comparador")

        resultado = actualizarDatos(nombreTabla, columnas, {'TRAZA': traza})

        return enviar_respuesta(message="Se actualizo correctamente",data=resultado)
    
    