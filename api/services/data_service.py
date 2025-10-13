# mi_app/utils.py
from django.apps import apps
from django.db import IntegrityError

def guardar_datos_nuevos(tabla_nombre, datos_dict):
    try:
        modelo = apps.get_model('api', tabla_nombre)
        instancia = modelo(**datos_dict)
        instancia.save()
        return {"mensaje": "Datos guardados correctamente", "status": 200}
    
    except IntegrityError as e:
        return {"mensaje": f"Error de integridad: {str(e)}", "status": 400}
    except Exception as e:
        return {"mensaje": f"Error: {str(e)}", "status": 500}

def actualizar_datos(tabla_nombre, datos_dict, filtro_dict):
    try:
        modelo = apps.get_model('api', tabla_nombre)
        
        # Buscamos el objeto usando el filtro y lo actualizamos
        objeto = modelo.objects.get(**filtro_dict)
        
        # Actualizamos los campos del objeto con los nuevos datos
        for campo, valor in datos_dict.items():
            setattr(objeto, campo, valor)
        
        objeto.save()
        return {"mensaje": "Datos actualizados correctamente", "status": 200}
    
    except modelo.DoesNotExist:
        return {"mensaje": "El objeto no existe", "status": 404}
    except IntegrityError as e:
        return {"mensaje": f"Error de integridad: {str(e)}", "status": 400}
    except Exception as e:
        return {"mensaje": f"Error: {str(e)}", "status": 500}

def obtener_datos_con_relaciones(tabla_nombre, columnas, filtros=None):
    try:
        modelo = apps.get_model('api', tabla_nombre)

        # Si tiene relaciones, usa select_related para obtener los datos relacionados
        consulta = modelo.objects.all()

        # Aplicar filtros si es necesario
        if filtros:
            consulta = consulta.filter(**filtros)

        # Usar select_related para cargar la relación
        consulta = consulta.select_related(*columnas)

        # Obtener los datos solicitados
        resultados = consulta.values(*columnas)

        return {"datos": list(resultados), "status": 200}
    
    except Exception as e:
        return {"mensaje": f"Error al obtener los datos: {str(e)}", "status": 500}
