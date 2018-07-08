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

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "b9955902ae4dd6d497dec07c917a3523"
  },
  {
    "url": "manifest.json",
    "revision": "973a66ea74c1181a3bb2af738951215f"
  },
  {
    "url": "shared/idb.js",
    "revision": "017ced36d82bea1e08b08393361e354d"
  },
  {
    "url": "shared/utility.js",
    "revision": "12bc69925e778c18146a6bf12138e062"
  },
  {
    "url": "style.css",
    "revision": "29647101ffd35a086a4591415b324f1f"
  },
  {
    "url": "sw-base.js",
    "revision": "66914c908ed66866abd928994f8147d2"
  },
  {
    "url": "viewmodel.js",
    "revision": "3fd56a097d4a12436f309e939d29f773"
  }
]);