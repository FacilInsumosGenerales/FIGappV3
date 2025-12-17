from django.db import connection
from ..errores.handle import raise_error
import json


def construirQuery(jsonInterpretado):
    try:
        print("Creando el query")

        nombreTabla = 'api_' + jsonInterpretado.get('nombreTabla')
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
        izq = "api_" + join.get("nombreTablaIzquierda", "")
        der = join.get("nombreTablaDerecha", "")
        campoIzq = join.get("campoIzquierda", "")
        campoDer = join.get("campoDerecha", "")
        campoAlias = join.get("nombreTablaIzquierdaAlias", "")

        sentenciaConAlias = f"{campoAlias}" if campoAlias else ""
        condicion = f"{campoAlias or izq}.{campoIzq} = {der}.{campoDer}"
        joins.append(f"{tipo} JOIN {izq} {sentenciaConAlias} ON {condicion}")
    print(joins)
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

def armarCallParaProcedimiento(jsonInterpretado,procedimiento):
    filtro = jsonInterpretado.get("datosFiltro", "")
    filtroAdi = jsonInterpretado.get("spParam", "")
    columnas = jsonInterpretado.get("informacionColumnas", {})
    tabla = jsonInterpretado.get("nombreTabla")

    if procedimiento == "duplicarFilasConjuntoTraza":
        filtroSp = duplicarFilas(tabla,columnas)
    else:
        filtroSp = crearFiltro(filtro, filtroAdi)

    sql_call = f"CALL {procedimiento}({filtroSp})"

    with connection.cursor() as cursor:
        cursor.execute(sql_call)
        try:
            resultado_sp = dictfetchall(cursor)
        except Exception:
            resultado_sp = []

    return resultado_sp

def duplicarFilas(tabla, columnas):
    filtroTabla = f"'api_{tabla}'"
    filtroTraza = f"'{json.dumps(columnas.get('trazasADuplicar', []))}'"
    filtroCampos = f"'{json.dumps(columnas.get('camposCambiados', {}), ensure_ascii=False)}'"

    return f"{filtroTabla}, {filtroTraza}, {filtroCampos}"

def crearFiltro(filtro, filtroAdi):
    filtroFormateado = ""

    if isinstance(filtro, list) and filtro and "comparador" in filtro[0]:
        filtroFormateado = eliminarAnd(filtro[0]["comparador"])

    if isinstance(filtroAdi, list) and filtroAdi:
        filtroFormateado = formatearParametrosAdicionales(filtroFormateado, filtroAdi)

    return filtroFormateado

def eliminarAnd(filtro):
    return filtro.replace(" AND ", " , ")

def formatearParametrosAdicionales(filtro, filtroAdi):
    parametros = ",".join(f"'{p}'" for p in filtroAdi)

    if filtro:
        return f"{filtro},{parametros}"
    return parametros

def dictfetchall(cursor):
    columnas = [col[0] for col in cursor.description]
    return [
        dict(zip(columnas, fila))
        for fila in cursor.fetchall()
    ]
