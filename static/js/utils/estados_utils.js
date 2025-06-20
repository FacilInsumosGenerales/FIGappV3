export function cambiarAEstado1(informeInfo, traza_req) {
    const redirectUrl = `ReqRegistrado.html?traza=${encodeURIComponent(traza_req)}`;    
    informeInfo.cambiarEstadoReq(1, redirectUrl);
}

export function cambiarAEstado2(informeInfo, traza_req) {

    const redirectUrl = `ReqConPlanilla.html?traza=${encodeURIComponent(traza_req)}`;    
    informeInfo.cambiarEstadoReq( 2, redirectUrl);
}

export function cambiarAEstado3(informeInfo, traza_req) {

    const redirectUrl = `ReqOfertasCompletas.html?traza=${encodeURIComponent(traza_req)}`;    
    informeInfo.cambiarEstadoReq(3, redirectUrl);
}

export function cambiarAEstado4(informeInfo) {

    const redirectUrl = `../Comercial.html`;    
    informeInfo.cambiarEstadoReq(4, redirectUrl);
}





