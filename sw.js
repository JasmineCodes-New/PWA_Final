//console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs-v1";
const assets = [
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pwacontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];


//install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed.');
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

//activate
self.addEventListener('activate', evt => {
    console.log('service worker has been activated.');
});

//fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});