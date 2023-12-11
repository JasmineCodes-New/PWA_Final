//console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs";
const assets = [
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pwacontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
]


caches.open(cacheName).then(cache => {
    cache.addAll(assets);
})

//install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed.');
});

//activate
self.addEventListener('activate', evt => {
    console.log('service worker has been activated.');
});

//fetch event
self.addEventListener('fetch', evt => {
    console.log(evt);
});