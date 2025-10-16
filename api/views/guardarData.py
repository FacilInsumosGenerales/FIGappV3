from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos, validarContenidoData
from ..services.dataService import guardarDatosNuevosNuevo


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class GuardarData(View):
    def post(self, request, *args, **kwargs):

        jsonRecibido = request.POST.get('data')
        usuario = request.POST.get('usuario')
        validarCamposRequeridos(data=jsonRecibido, usuario=usuario)

        jsonInterpretado = json.loads(jsonRecibido, ['nombreTabla', 'columnas'])
        validarContenidoData(jsonInterpretado)

        columnas = jsonInterpretado.get('columnas')
        nombreTabla = jsonInterpretado.get('nombreTabla')

        resultados = guardarDatosNuevosNuevo(nombreTabla, columnas)
        return jsonInterpretado(resultados)

