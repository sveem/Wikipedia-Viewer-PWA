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
  console.log('ARGS', args.event)
  fetch(args.event.request)
    .then(function (res) { 
      var clonedRes = res.clone()
          return clonedRes.json();
        })
        .then(function (data) {
          console.log('ITEM', data);
          var pages = data.query.pages
          writeData('input', { pages: pages })
          return data;
        });
});

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "8d486ee975def73c7de8df6f529145f1"
  },
  {
    "url": "manifest.json",
    "revision": "f3ed9a89c04b199f320bafb978490095"
  },
  {
    "url": "shared/idb.js",
    "revision": "edfbee0bb03a5947b5a680c980ecdc9f"
  },
  {
    "url": "shared/utility.js",
    "revision": "6d949b6d73c242adf3585142557e8c93"
  },
  {
    "url": "style.css",
    "revision": "85ecc83bc3b234d59c77cd6af8958637"
  },
  {
    "url": "sw-base.js",
    "revision": "8f6d932cce70cf382904576c3822c569"
  },
  {
    "url": "viewmodel.js",
    "revision": "4d5b72db19df1919e38a6f63df65447d"
  }
]);


// workbox.routing.registerRoute(/.*(?:wikipedia)\.org.*$/, function (args) {
//   fetch(args.event.request)
//     .then(function (res) { 
//       var clonedRes = res.clone();
//       // Remove clearAllData - Create a button to clean the collection in indexedDB
//       clearAllData('input')
//         .then(function () {
//           return clonedRes.json();
//         })
//         .then(function (data) {
//           var pages = data.query.pages;
//           writeData('input', {pageid : 123, pages: pages})
//           // TODO: Modify pageid - Everything works!!!!
//           // Add lodash, remove pages.pageid - change the shape of the data
//           // 
//           // for (var key in pages) {
//           //   writeData('input', pages[key]);
//           // }  
//         });
//       return res;
//     });
// });