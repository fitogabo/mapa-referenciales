// MapboxUtility.js

// Configuración de la llave del API, reemplázala con tu llave real de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Fib3BhbnRlcmEiLCJhIjoiY2xlZG52M3R2MDV4ZDNvbXJwN2hlZXZmMCJ9.T4YSPRr9Hbxp0ID5-NLkCg';

// Inicializa el mapa en un elemento con el id 'map' en tu HTML
const map = new mapboxgl.Map({
    container: 'map', // Especifica el contenedor en el que quieres que se muestre el mapa
    style: 'mapbox://styles/mapbox/streets-v11', // Especifica el estilo base del mapa
    center: [-74.0060, 40.7128], // Coordenadas de inicio del mapa [lng, lat]
    zoom: 13 // Nivel de acercamiento inicial
});

// Función para cargar los datos como una capa en el mapa de Mapbox
function loadToMapbox(data) {
    // Esperar a que el mapa se cargue antes de añadir cualquier dato
    map.on('load', () => {
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

// Asegúrate de exportar las funciones u objetos que utilizas en otros módulos
export { loadToMapbox };