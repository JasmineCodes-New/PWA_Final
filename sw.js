const cacheName = "app-shell-rsrs-v1";
const assets = [
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pwacontacts.png',
    'pages/about.html',
    'pages/default.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// Cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(async (cache) => {
        const keys = await cache.keys();
        if (keys.length > size) {
            cache.delete(keys[0]).then(() => limitCacheSize(name, size));
        }
    });
};

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching Files');
            return cache.addAll(assets);
        }).catch((error) => {
            console.error('Service Worker: Cache failed', error);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then((cacheKeys) => {
            return Promise.all(
                cacheKeys.map((key) => {
                    if (key !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);

    if (event.request.destination === 'document') {
        event.respondWith(
            caches.match(event.request).then((cacheRes) => {
                if (cacheRes) {
                    return cacheRes; // Respond with cached content if available
                }

                // If not cached, fetch from the network and cache dynamically
                return fetch(event.request)
                    .then((fetchRes) => {
                        return caches.open(cacheName).then((cache) => {
                            cache.put(event.request, fetchRes.clone());
                            return fetchRes;
                        });
                    })
                    .catch((error) => {
                        console.error('Service Worker: Fetch failed', error);
                        // return a fallback response for failed fetches
                        // return new Response('Fallback content here', { headers: { 'Content-Type': 'text/html' } });
                    });
            })
        );
    } else {
        // For other file types like CSS, JS, images, handle as before
        event.respondWith(
            caches.match(event.request).then((cacheRes) => {
                return cacheRes || fetch(event.request);
            })
        );
    }
});

// Cache size limit
limitCacheSize(cacheName, 30);


