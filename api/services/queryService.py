from django.db import connection
from ..errores.handle import raise_error


def construirQuery(jsonInterpretado):
    try:
        print("Creando el query")

        nombreTabla = jsonInterpretado.get('nombreTabla')
        valorEnSelect = construirValorEnSelect(jsonInterpretado.get("informacionColumnas"))
        valorEnCruce = construirValorEnCruce(jsonInterpretado.get('tablaJoins',[]))
        valorEnCondicional = construirValorEnCondicional(jsonInterpretado.get('datosFiltro', []))
        valorEnAgrupado = construirValorEnAgrupado(jsonInterpretado.get('groupby',[]))
        valorEnCondicionalGrupo = construirValorEnCondicionalGrupo(jsonInterpretado.get('having'))
        valorEnOrdenar = construirValorEnOrdenar(jsonInterpretado.get('orderby',[]))
        
        with connection.cursor() as cursor:
            cursor.callproc(
                'ejecutarQuery',
                [valorEnSelect, nombreTabla, valorEnCruce, valorEnCondicional, valorEnOrdenar, valorEnAgrupado, valorEnCondicionalGrupo]
            )
            columnas = [col[0] for col in cursor.description]
            resultados = [dict(zip(columnas, fila)) for fila in cursor.fetchall()]

        return resultados
    except Exception as e:
        print("Error")
        raise_error("E999", f"Error al ejecutar la consulta: {str(e)}")

def construirValorEnSelect(informacionColumnas):
    print("construirValorEnSelect")
    return ", ".join(informacionColumnas)

def construirValorEnCruce(tablaJoins):
    joins = []
    print("construirValorEnCruce")
    for join in tablaJoins:
        tipo = join.get("tipoRelacion", "")
        izq = join.get("nombreTablaIzquierda", "")
        der = join.get("nombreTablaDerecha", "")
        campoIzq = join.get("campoIzquierda", "")
        campoDer = join.get("campoDerecha", "")
        campoAlias = join.get("nombreTablaIzquierdaAlias", "")

        sentenciaConAlias = f" {campoAlias}" if campoAlias else ""
        condicion = f"{campoAlias or izq}.{campoIzq} = {der}.{campoDer}"
        joins.append(f"{tipo} JOIN {izq}{sentenciaConAlias} ON {condicion}")

    return " ".join(joins)

def construirValorEnCondicional(datosFiltro):
    print("construirValorEnCondicional")
    if not datosFiltro:
        return ""
    condiciones = []
    for filtro in datosFiltro:
        tabla = filtro.get("tabla", "")
        col = filtro["columna"]
        op = filtro["operacion"]
        comp = filtro["comparador"]
        sigOp = filtro.get("siguienteOperacion")
        expr = f"{tabla + '.' if tabla else ''}{col} {op} {comp}"
        if sigOp:
            expr += f" {sigOp}"
        condiciones.append(expr)
    return "WHERE " + " ".join(condiciones)

def construirValorEnAgrupado(groupby):
    print("construirValorEnAgrupado")
    if not groupby:
        return ""
    partes = [f"{g.get('tabla', '') + '.' if g.get('tabla') else ''}{g['columna']}" for g in groupby]
    return "GROUP BY " + ", ".join(partes)

def construirValorEnCondicionalGrupo(havings):
    print("construirValorEnCondicionalGrupo")
    if not havings:
        return ""
    condiciones = []
    for having in havings:
        col = having["columna"]
        op = having["operacion"]
        comp = having["comparador"]
        sig = having.get("siguienteOperacion")
        expr = f"{col} {op} {comp}"
        if sig:
            expr += f" {sig}"
        condiciones.append(expr)
    return "HAVING " + " ".join(condiciones)

def construirValorEnOrdenar(orderby):
    print("construirValorEnOrdenar")
    if not orderby:
        return ""
    partes = []
    for o in orderby:
        tabla = o.get("tabla", "")
        col = o["columna"]
        orden = o["orden"]
        partes.append(f"{tabla + '.' if tabla else ''}{col} {orden}")
    return "ORDER BY " + ", ".join(partes)
