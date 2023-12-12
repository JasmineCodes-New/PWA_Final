// Service worker file: public/sw.js
const CACHE_NAME = 'version-1';
const urlsToCache = [
  'index.html',
  'offline.html',
  '/static/js/bundle.js', // This might change based on your CRA build
  '/static/js/main.chunk.js', // This might change based on your CRA build
  '/static/js/0.chunk.js', // This might change based on your CRA build
  '/static/css/main.chunk.css', // This might change based on your CRA build
];

// Installation of Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offline.html'));
      })
  );
});

// Activate the Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});

// Listen for waiting service worker to be installed
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
