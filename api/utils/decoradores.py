from django.http import JsonResponse
from functools import wraps
from ..errores.excepciones import BaseAppException
from django.db import IntegrityError

def manejarErroresVista(view_class):
    originalDispatch = view_class.dispatch

    @wraps(originalDispatch)
    def nuevoDispatch(self, request, *args, **kwargs):
        try:
            return originalDispatch(self, request, *args, **kwargs)
        except IntegrityError as e:
            return JsonResponse({"error_code": "E400", "message": f"El dato ya existe: {str(e)}"}, status=409)
        except BaseAppException as e:
            return JsonResponse(e.aDiccionario(), status=e.estado)
        except Exception as e:
            return JsonResponse({"error_code": "E500", "message": f"Error en codigo: {str(e)}"}, status=500)
    
    view_class.dispatch = nuevoDispatch
    
    return view_class

