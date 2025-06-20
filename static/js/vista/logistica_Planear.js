import { RecopiladorDatos } from "../componentes/RecopiladorDatos.js";
import { TablaVistaFabrica } from "../fabricas/TablaVistaFabrica.js";
import { prodLogistica_columnasTodas, tablaMadreProdLogistica } from "../modelos/ProdLogistica.js";

const recopConfig_prodLog = {procedimientoAlmacenado:'productosEnMovimiento'};
const recop_prodLog = new RecopiladorDatos(prodLogistica_columnasTodas,tablaMadreProdLogistica,{},{},recopConfig_prodLog);
const tabla_prodLog = TablaVistaFabrica.crear(recop_prodLog);

$(document).ready(async function() { 

    tabla_prodLog.renderizar("tblProductosOC");   

    
});