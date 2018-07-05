importScripts('./shared/idb.js');
importScripts('./shared/utility.js');

// var CACHE_STATIC_NAME = 'static';
// var STATIC_FILES = [
//     '/',
//     '/index.html',
//     '/style.css',
//     '/viewmodel.js',
//     './shared/idb.js',
//     './shared/utility.js',
//     'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
//     'https://fonts.googleapis.com/css?family=Open+Sans',
//     'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
//     'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js'
// ];

// self.addEventListener('install', function(event) {
//   console.log('[Service Worker] Installing Service Worker ...', event);
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME)
//       .then(function(cache) {
//         console.log('Cache status', cache);
//         cache.addAll(STATIC_FILES);
//       })
//   )
// });

// self.addEventListener('activate', function(event) {
//   console.log('[Service Worker] Activating Service Worker ...', event);
//   return self.clients.claim();
// });

// self.addEventListener('fetch', function(event) {
//   console.log('[Service Worker] Fetching something ...', event);
//   var url = 'https://en.wikipedia.org/'
//   var matched = event.request.url.match(url);
//   event.respondWith(fetch(event.request.url)
//     .then(function (res) {
//         console.log('Response', res)
//         var clonedRes = res.clone();
//         return clonedRes               
//       })
//     )
// })
