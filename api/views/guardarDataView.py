from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from ..utils.decoradores import manejarErroresVista
from ..utils.validacion import validarCamposRequeridos, validarContenidoData
from ..services.dataService import guardarDatosNuevos
from ..utils.funcionesGenerales import enviar_respuesta


@method_decorator(csrf_exempt, name='dispatch')  # Aplica CSRF exempt a toda la clase
@manejarErroresVista
class GuardarDataView(View):
    def post(self, request, *args, **kwargs):

        print(1)
        jsonRecibido = request.POST.get('data')
        usuario = request.POST.get('usuario')

        print("jsonRecibido")
        print(jsonRecibido)
        print("usuario")
        print(usuario)

        print("validando campos...")
        validarCamposRequeridos(data=jsonRecibido, usuario=usuario)

        print("interpretar json")
        jsonInterpretado = json.loads(jsonRecibido)

        print("validar contenido interpretado")
        validarContenidoData(jsonInterpretado, ['nombreTabla', 'columnas'])


        columnas = jsonInterpretado.get('columnas')
        nombreTabla = jsonInterpretado.get('nombreTabla')

        print("Guardar datos")
        resultados = guardarDatosNuevos(nombreTabla, columnas)

        print("resultados", resultados)
        return enviar_respuesta(data=resultados, message="Datos guardados correctamente")

