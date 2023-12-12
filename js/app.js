// Correct (CommonJS syntax)
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } = require('firebase/auth');
const { initializeApp } = require('firebase/app');

// Check if the service worker is supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
                console.log('Service worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service worker registration failed:', error);
            });
    });
}

// Import Page.js for routing
const page = require('./routes.js'); // Adjust the path to your routes file

// Start routing
page();

// Initialize Firebase Authentication
const auth = getAuth();

// Function to sign up a new user
const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            console.log("User signed up:", user);
        })
        .catch((error) => {
            // Handle errors during signup
            console.error("Error signing up:", error);
        });
};

// Function to sign in an existing user
const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log("User signed in:", user);
        })
        .catch((error) => {
            // Handle errors during sign-in
            console.error("Error signing in:", error);
        });
};

// Function to sign out the current user
const signOutUser = () => {
    signOut(auth)
        .then(() => {
            // User signed out successfully
            console.log("User signed out");
        })
        .catch((error) => {
            // Handle errors during sign-out
            console.error("Error signing out:", error);
        });
};

// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user);
    } else {
        // User is signed out
        console.log("User is signed out");
    }
});
