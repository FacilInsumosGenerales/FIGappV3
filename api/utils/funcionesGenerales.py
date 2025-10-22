from django.http import JsonResponse


def enviar_respuesta(data=None, message=""):
    response = {
        "success": True,
        "data": data,
        "message": message
    }

    return JsonResponse(response, json_dumps_params={'ensure_ascii': False})

