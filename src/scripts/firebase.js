// Importar los servicios que vas a usar de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "tuapikey",
    authDomain: "referenciales-ba5b2.firebaseapp.com",
    databaseURL: "https://referenciales-ba5b2-default-rtdb.firebaseio.com",
    projectId: "referenciales-ba5b2",
    storageBucket: "referenciales-ba5b2.appspot.com",
    messagingSenderId: "110126794045",
    appId: "1:110126794045:web:3fbebfef6ff8ffd2533154",
    measurementId: "G-QGT2RNG1QS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Exportar las instancias para usarlas en todo tu proyecto
export { app, auth, database };
