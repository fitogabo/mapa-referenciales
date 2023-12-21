import * as XLSX from 'xlsx';

// función que maneja la lectura del archivo Excel
export function readExcelFile(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Supongamos que queremos leer la primera hoja del libro
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir la hoja de trabajo a JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);

        // Aquí puedes llamar a alguna función para manejar los datos obtenidos
        // Por ejemplo: processExcelData(jsonData);
    };

    reader.onerror = function (ex) {
        console.error(ex);
    };

    reader.readAsArrayBuffer(file);
}

// función que maneja la carga del archivo
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Llamada a la función readExcelFile para procesar el archivo
        readExcelFile(file);
    }
}

// Esperar a que el DOM esté completamente cargado antes de asignar el listener
document.addEventListener('DOMContentLoaded', (event) => {
    // Enlazar el evento al input
    const fileUploadElement = document.getElementById('file-upload');
    if (fileUploadElement) {
        fileUploadElement.addEventListener('change', handleFileUpload);
    } else {
        console.error('No se encontró el elemento #file-upload en el DOM');
    }
});