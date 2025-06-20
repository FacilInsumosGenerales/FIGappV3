from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import guardar_datos_nuevos, actualizar_datos,obtener_datos_con_relaciones
import json
import os
from django.conf import settings


@csrf_exempt
def guardar(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            columnas = data.get('columnas', [])
            nombreTabla = data.get('nombreTabla', [])
            
            if not columnas:
                return JsonResponse({"mensaje": "No se recibieron columnas", "status": 400})

            # Llamar a la función de guardar
            resultado = guardar_datos_nuevos(nombreTabla, columnas)
            return JsonResponse(resultado)

        except Exception as e:
            return JsonResponse({"mensaje": str(e), "status": 500})

@csrf_exempt
def actualizar(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            columnas = data.get('columnas', [])
            nombreTabla = data.get('nombreTabla', [])
            
            if not columnas:
                return JsonResponse({"mensaje": "No se recibieron columnas", "status": 400})

            # Llamar a la función de actualizar
            resultado = actualizar_datos(nombreTabla, columnas, {'TRAZA': data.get('TRAZA')})
            return JsonResponse(resultado)

        except Exception as e:
            return JsonResponse({"mensaje": str(e), "status": 500})


@csrf_exempt
def subir_archivo(request):
    if request.method == 'POST' and request.FILES.get('archivo'):
        archivo = request.FILES['archivo']
        
        # Guardar el archivo en un directorio específico (por ejemplo, en el directorio 'uploads/')
        directorio_guardado = os.path.join(settings.BASE_DIR, 'uploads')
        if not os.path.exists(directorio_guardado):
            os.makedirs(directorio_guardado)

        # Crear un nombre de archivo único
        nombre_archivo = archivo.name
        ruta_guardada = os.path.join(directorio_guardado, nombre_archivo)

        # Guardar el archivo
        with open(ruta_guardada, 'wb') as f:
            for chunk in archivo.chunks():
                f.write(chunk)

        # Devolver la ruta donde se guardó el archivo
        return JsonResponse({"mensaje": "Archivo guardado correctamente", "status": 200, "ruta": ruta_guardada})
    
    return JsonResponse({"mensaje": "No se recibió ningún archivo", "status": 400})


@csrf_exempt  # Solo si no estás usando CSRF en tus peticiones AJAX (ten cuidado con esto)
def obtener_datos_view(request):

    print(1)
    # Recibir parámetros desde el request (pueden ser enviados como JSON o GET parameters)
    tabla_nombre = request.GET.get('tabla_nombre')
    columnas = request.GET.getlist('columnas')
    filtros = request.GET.get('filtros')  # Si necesitas un filtro, debe ser un JSON serializable
    
    print(columnas, type(columnas))
    # Convertir filtros a un diccionario si es necesario (esto dependerá de cómo lo envíes)
    if filtros:
        filtros = json.loads(filtros)
    else:
        filtros = {}

    print(3)
    # Llamar a la función para obtener los datos
    respuesta = obtener_datos_con_relaciones(tabla_nombre, columnas, filtros)
    
    print(4)
    return JsonResponse(respuesta)
