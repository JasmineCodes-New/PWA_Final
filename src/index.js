import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        // Registration was successful
        console.log('Service Worker registered with scope: ', registration.scope);
      }, err => {
        // registration failed :(
        console.log('Service Worker registration failed: ', err);
      });
  });
}


