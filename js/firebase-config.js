// firebase-config.js
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeCDgF_gtOlS9nJDWPqVM9GbB5aQssR7U",
  authDomain: "contacts-app-4fa64.firebaseapp.com",
  projectId: "contacts-app-4fa64",
  storageBucket: "contacts-app-4fa64.appspot.com",
  messagingSenderId: "201224959248",
  appId: "1:201224959248:web:05ac6655e9013e28f16195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with the app instance
const auth = getAuth(app);

module.exports = auth; // Export the auth object for use in other parts of your code
