import * as XLSX from 'xlsx';

// Esta función prepara los datos para ser utilizados por Mapbox GL JS
function processExcelData(jsonData) {
    // Mapea los datos JSON a la estructura GeoJSON requerida por Mapbox
    const geojson = {
        type: 'FeatureCollection',
        features: jsonData.map(item => {
            // Reemplazar comas por puntos y luego convertir a flotante
            const latitude = parseFloat(item.latitude.replace(',', '.'));
            const longitude = parseFloat(item.longitude.replace(',', '.'));
            if (!isNaN(latitude) && !isNaN(longitude)) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    properties: {
                        idRegistro: item["ID DEL REGISTRO"],
                        fojas: item["FOJAS"],
                        numero: item["N°"],
                        año: item["AÑO"],
                        comprador: item["COMPRADOR"],
                        vendedor: item["VENDEDOR"],
                        predio: item["PREDIO"],
                        comuna: item["COMUNA"],
                        rol: item["ROL"],
                        fechaEscritura: item["FECHA DE ESCRITURA"],
                        superficie: parseFloat(item["SUPERFICIE (M2)"]),
                        monto: parseFloat(item["MONTO ($)"]),
                        observacion: item["OBSERVACIÓN"]
                    }
                };
            }
            return null;
        }).filter(item => item !== null)
    };
    return geojson;
}

function isValidGeoJson(geojson) {
    return geojson
        && geojson.type === 'FeatureCollection'
        && Array.isArray(geojson.features)
        && geojson.features.every(feature => feature.type === 'Feature' && feature.geometry);
}

// Función que maneja la lectura del archivo Excel
export function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const geojsonData = processExcelData(jsonData);

            // Aquí debes validar el GeoJSON
            if (isValidGeoJson(geojsonData)) {
                console.log('El GeoJSON es válido:');
                console.log(JSON.stringify(geojsonData, null, 2));
                resolve(geojsonData);
            } else {
                console.error('El GeoJSON no es válido');
                reject(new Error('El GeoJSON generado no es válido'));
            }
        };

        reader.onerror = function (error) {
            reject(error);
        };

        // Antes de llamar a readAsArrayBuffer, asegurate que `file` sea del tipo correcto
        if (file instanceof Blob) {
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error('El archivo proporcionado no es un Blob.'));
        }
    });




}


