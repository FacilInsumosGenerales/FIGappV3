from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos, validarContenidoData
from ..services.deleteService import eliminarDatos
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class EliminarDataView(View):
    def post(self, request, *args, **kwargs):
        jsonRecibido = request.POST.get('data')
        validarCamposRequeridos(data=jsonRecibido)
        jsonInterpretado = json.loads(jsonRecibido)

        validarContenidoData(jsonInterpretado, ['nombreTabla','datosFiltro'])
        
        nombreTabla = jsonInterpretado.get('nombreTabla')
        traza = jsonInterpretado.get('datosFiltro')[0].get("comparador")

        resultado = eliminarDatos(nombreTabla, traza)

        return enviar_respuesta(message="Se elimino correctamente")
    
    