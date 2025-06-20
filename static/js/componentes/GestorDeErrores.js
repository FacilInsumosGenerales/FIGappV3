export class GestorDeErrores {

    static notificarAlerta(mensaje) {
      Swal.fire({
        title: 'Alerta',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }

    static notificarError(mensaje) {
        Swal.fire({
            title: "Error",
            text: mensaje,
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
    
  }