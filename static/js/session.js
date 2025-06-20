// Esta página contiene las funciones necesarias para el manejo de sesiones
// Incluye la verificación de inactividad prolongada de la sesión, 
// así como las funciones para cerrar una sesión

import { config } from "../../config.js";
import { alertGeneral } from "./utils/alert_utils.js";


// Define la duración máxima de inactividad de la sesión (en milisegundos)
const timeoutDuration = 7200000; // 2 horas = 7200000
const url = 'https://facilinsumos.com/sistemas/'+ config.base_url +'/webapp/index.html';

export function checksession() {
    // Recupera el usuario y la última actividad desde localStorage
    const user = localStorage.getItem('user');
    const lastActivity = localStorage.getItem('last_activity');

    // Verifica si hay un usuario almacenado (es decir, si hay una sesión activa)
    if (user) {
        // Calcula el tiempo de inactividad de la sesión
        const sessionAge = Date.now() - lastActivity;

        // Si el tiempo de inactividad supera el límite permitido, cierra la sesión
        if (sessionAge > timeoutDuration) {
            // Si la sesión ha expirado, limpia el almacenamiento y cierra la sesión
            logoutUser();
        } else {
            // Si la sesión aún es válida, actualiza el tiempo de la última actividad
            localStorage.setItem('last_activity', Date.now());
        }
    } else {
        // Si no se encuentra un usuario en localStorage, redirige a la página de inicio de sesión
        redirectToLogin();
    }
}

function logoutUser() {
    // Limpia el almacenamiento de sesión eliminando el usuario y la última actividad
    localStorage.removeItem('user');
    localStorage.removeItem('last_activity');
    
    // Muestra un mensaje indicando que la sesión ha expirado y el usuario ha sido desconectado
    const titulo =  "Ups! Tu sesión ha expirado.";
    const mensaje = "No te preocupes, puedes volver a entrar cuando quieras.";

    alertGeneral(titulo,mensaje, url, "info");

}

function redirectToLogin() {
    // Simula una redirección a la página de inicio de sesión
    window.location.href = url;
}
