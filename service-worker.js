// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v22';
// Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'index.html',
    'apropos.html',  
    'contact.html',  
    'confirmation.html',
    'pastaio.html',
    'polarka.html',
    'renova.html'
];

/// INSTALLATION SERVICE WORKER
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE).catch((error) => {
                console.error('[ServiceWorker] Pre-caching failed:', error);
                // Iterate over each file to identify which one is causing the issue
                FILES_TO_CACHE.forEach(async (file) => {
                    try {
                        await cache.add(file);
                        console.log(`[ServiceWorker] Cached ${file} successfully.`);
                    } catch (e) {
                        console.error(`[ServiceWorker] Failed to cache ${file}:`, e);
                    }
                });
                throw error; // Propagate the error
            });
        })
    );
    self.skipWaiting();
});

// ACTIVATION
self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// ACCÈS À UNE RESSOURCE
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request).catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('/Anoukbarnes/TP3_AnoukBarnes/offline.html');
                });
        })
    );
});