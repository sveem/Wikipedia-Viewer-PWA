importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");
importScripts('./shared/idb.js');
importScripts('./shared/utility.js');

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/, 
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 3
      })
    ]
  })
); 

workbox.routing.registerRoute(/.*(?:bootstrapcdn)\.com.*$/, 
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'bootstrap-css'  
  })
);

workbox.routing.registerRoute(/.*(?:wikipedia)\.org.*$/, function (args) {
  fetch(args.event.request)
    .then(function (res) { 
      var clonedRes = res.clone();
      clearAllData('input')
        .then(function () {
          return clonedRes.json();
        })
        .then(function (data) {
          var pages = data.query.pages;
          for (var key in pages) {
            console.log('KEY', key);
            console.log('PAGES[KEY]', pages[key]);
            writeData('input', pages[key]);
          }  
        });
      return res;
    });
});

workbox.precaching.precacheAndRoute([]);