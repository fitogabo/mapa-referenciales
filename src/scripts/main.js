// main.js
// Importaciones en la parte superior del archivo
import mapboxgl from 'mapbox-gl';
import { observeAuthState, signOutUser } from './auth.js';
import { readExcelFile } from './excelReader.js';
import { initMapbox, loadToMapbox, hideMap } from './MapboxUtility.js';

let currentUser = null;
let initMapboxDebounced;
let geojsonData;

// Maneja la autenticación y carga del mapa
function initApp() {
    observeAuthState(user => {
        currentUser = user;
        clearTimeout(initMapboxDebounced);
        initMapboxDebounced = setTimeout(() => {
            if (user) {
                console.log('Usuario conectado:', user.email);
                initMapbox();
                document.getElementById('map').style.display = 'block';
            } else {
                console.log('Usuario no conectado o sesión cerrada.');
                hideMap();
            }
        }, 250); // Debounce por 250 milisegundos
    });

    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton) {
        signOutButton.addEventListener('click', signOutUser);
    }

    // Input de carga de archivo
    const fileInput = document.getElementById('file-upload');
    const loadButton = document.getElementById('load-file');

    // Este event listener maneja la selección y la carga del archivo
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file.name);
            readExcelFile(file)
                .then(data => {
                    geojsonData = data; // Almacena los datos para cargarlos después
                    console.log('Lectura de archivo Excel completa. Datos procesados:', geojsonData);
                })
                .catch(error => console.error('Error al leer el archivo:', error));
        } else {
            console.log('No se seleccionó ningún archivo.');
        }
    });

    // Este event listener maneja la carga del archivo al mapa
    loadButton.addEventListener('click', () => {
        if (currentUser && geojsonData) {
            loadToMapbox(geojsonData);
        } else {
            alert('Debes iniciar sesión y seleccionar un archivo para cargar datos.');
        }
    });
}

// Event listener para cuando el contenido del DOM esté totalmente cargado
document.addEventListener('DOMContentLoaded', initApp);
