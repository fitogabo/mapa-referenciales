// Importaciones en la parte superior del archivo
import { auth } from './firebase.js';
import { readExcelFile } from './excelReader.js';
import { loadToMapbox } from './MapboxUtility.js';

// Token de acceso a Mapbox
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2Fib3BhbnRlcmEiLCJhIjoiY2xlZG52M3R2MDV4ZDNvbXJwN2hlZXZmMCJ9.T4YSPRr9Hbxp0ID5-NLkCg';

// Esta función genera el mapa después de que se autentica el usuario
function initMapbox() {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.24589, -39.81959],
        zoom: 9
    });
}

// Ejemplo de función de autenticación y carga de mapa
function initApp() {
    auth.onAuthStateChanged(user => {
        if (user) {
            initMapbox();
            console.log('Usuario conectado:', user.email);
        } else {
            console.log('Usuario no conectado o sesión cerrada.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicación al cargar el DOM
    initApp();

    // Configurar el oyente del evento de cambio para el input del archivo
    const fileInput = document.getElementById('file-upload'); // importante que el ID coincida con el ID de index.html
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                readExcelFile(file);
            }
        });
    } else {
        console.error('El elemento de entrada del archivo no existe en el DOM');
    }
});