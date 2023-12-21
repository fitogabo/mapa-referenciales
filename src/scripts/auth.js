// Importamos las funciones que necesitamos desde la SDK de Firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Asegúrate de importar la instancia de `auth` que configuraste en `firebase.js`
import { auth } from './firebase.js';

// Registro de usuarios
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User created:', user);
            // Puedes cerrar el formulario o resetearlo aquí
            signupForm.reset();
        })
        .catch((error) => {
            console.error(error);
            // Manejar errores de registro aquí
        });
});

// Asegúrate seguir la misma aproximación para otras funciones de autenticación que estés utilizando