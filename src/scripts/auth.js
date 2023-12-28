// auth.js

// Importamos las funciones que necesitamos desde la SDK de Firebase
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Importamos la instancia de `auth` que configuraste en `firebase.js`
import { auth } from './firebase.js';

// Función para ocultar el mapa
function hideMap() {
    if (!auth.currentUser) {
        document.getElementById('map').style.display = 'none';
    }
}

// Función para cerrar sesión
function signOutUser() {
    signOut(auth).then(() => {
        // Usuario cerró sesión exitosamente
        console.log('User signed out successfully');
        hideMap();
        // Aquí deberías también actualizar el estado de la interfaz de usuario para reflejar que el usuario cerró sesión
    }).catch((error) => {
        // Error al cerrar sesión
        console.error('Sign out error', error);
    });
}

// Función para mostrar un mensaje de bienvenida al usuario
function showWelcomeMessage() {
    const user = auth.currentUser;
    if (user) {
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `Bienvenido, ${user.displayName || 'Usuario'}!`;
        welcomeMessage.style.display = 'block';
    }
}

// Wrapper alrededor de la función de Firebase onAuthStateChanged
function observeAuthState(userCallback) {
    onAuthStateChanged(auth, userCallback);
}

// Manejo del formulario de registro
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario creado exitosamente
            const user = userCredential.user;
            console.log('User created:', user);
            // Puedes cerrar el formulario o resetearlo aquí
            signupForm.reset();
            // Ocultar el mapa aquí o llamar a una función que lo haga.
            hideMap();
        })
        .catch((error) => {
            // Error al crear usuario
            console.error(error);
            // Manejar errores de registro aquí
            if (error.code === 'auth/invalid-email') {
                signupForm['signup-email'].setCustomValidity('El correo electrónico no es válido.');
            } else if (error.code === 'auth/weak-password') {
                signupForm['signup-password'].setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
            }
        });
});

// Manejo del formulario de inicio de sesión
const signinForm = document.getElementById('signin-form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signinForm['signin-email'].value;
    const password = signinForm['signin-password'].value;

    // Utilizamos signInWithEmailAndPassword para iniciar sesión con las credenciales del usuario
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Ahora puedes redirigir al usuario a otra página o actualizar la interfaz de usuario
            // Por ejemplo, mostrar el mapa si lo ocultaste durante el proceso de inicio de sesión
            document.getElementById('map').style.display = 'block';
            showWelcomeMessage();
        })
        .catch((error) => {
            // Error en el inicio de sesión
            console.error('Error signing in:', error);
            alert('Error al iniciar sesión: ' + error.message);
        });
});

// Exportamos las funciones para que puedan ser usadas en otros módulos
export { hideMap, signOutUser, observeAuthState, showWelcomeMessage };

// Prueba para asegurar que getAuth se está utilizando
console.log(getAuth());
