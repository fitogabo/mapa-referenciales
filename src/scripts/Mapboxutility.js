// MapboxUtility.js
import mapboxgl from 'mapbox-gl';

// Configuración de la llave del API, reemplázala con tu llave real de Mapbox
mapboxgl.accessToken = 'aqui va mi token de mapbox';
// Variable global dentro de este módulo para almacenar la instancia del mapa
let map = null;

// Definir la función initMapbox
function initMapbox() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Vacía el contenedor del mapa si tiene algún contenido
        mapContainer.innerHTML = '';
    }

    if (map) { // Si ya hay un mapa, asegúrate de eliminarlo
        map.remove();
        map = null;
    }

    // Ahora puedes estar seguro de que el contenedor está vacío y no hay otro mapa
    map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.245209, -39.818272],
        zoom: 13
    });
    return map;
}

// Función para cargar los datos como una capa en el mapa de Mapbox
function loadToMapbox(data) {
    if (!map) { // Asegúrate de que el mapa ha sido inicializado
        console.error('El mapa no ha sido inicializado.');
        return;
    }

    // Esperar a que el mapa se cargue antes de añadir cualquier dato
    map.on('load', function () { // Usar función anónima para no perder el contexto de `map`
        // Agrega una nueva fuente al mapa desde los datos en formato GeoJSON
        map.addSource('excelData', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: data.map(item => {
                    return {
                        type: 'Feature',
                        properties: item,
                        geometry: {
                            type: 'Point',
                            // Asumimos que el item incluye latitud y longitud
                            coordinates: [item.longitud, item.latitud]
                        }
                    };
                })
            }
        });

        // Agrega una nueva capa al mapa utilizando la fuente de datos anterior
        map.addLayer({
            id: 'points', // Identificador único de la capa
            type: 'circle', // Tipo de capa, en este caso puntos representados por círculos
            source: 'excelData', // La fuente de datos que acabamos de añadir
            paint: {
                // Estilo de los círculos (puntos) en el mapa
                'circle-radius': 10, // Tamaño del radio de los puntos
                'circle-color': '#007cbf' // Color de los puntos
            }
        });
    });
}

function hideMap() {
    if (map) { // Elimina la instancia del mapa si está presente
        map.remove();
        map = null;
    }

    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.style.display = 'none';
        mapContainer.innerHTML = ''; // También limpia el contenedor
    }
}
// Asegúrate de exportar las funciones u objetos que utilizas en otros módulos
export { initMapbox, loadToMapbox, hideMap };
