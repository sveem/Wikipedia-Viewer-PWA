importScripts('./idb.js')

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static')
      .then(function(cache) {
        console.log('Cache status', cache);
        cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/viewmodel.js',
          '/idb.js',
          'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://fonts.googleapis.com/css?family=Open+Sans',
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...', event);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        else {
          fetch(event.request);
        }
      }
   ));
})