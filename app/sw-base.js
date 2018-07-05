importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/, 
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts'  
}));

workbox.precaching.precacheAndRoute([]);