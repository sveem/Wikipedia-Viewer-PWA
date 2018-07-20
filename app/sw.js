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
      var clonedRes = res.clone()
          return clonedRes.json();
        })
        .then(function (data) {
          console.log('DATAAAA', data);
          var pages = data.query.pages;
          writeData('input', {pages: pages})
          // writeData('input', {pageid : 12, pages: pages})

          // TODO: Modify pageid - Everything works!!!!
          // Add lodash, remove pages.pageid - change the shape of the data
          // 
          // for (var key in pages) {
          //   writeData('input', pages[key]);
          // }  
          return data;
        });
});

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "0242c48ff0ea2f22f059437016c321a7"
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
    "revision": "5c17dae3069303e9000c1f69fed0e533"
  },
  {
    "url": "style.css",
    "revision": "85ecc83bc3b234d59c77cd6af8958637"
  },
  {
    "url": "sw-base.js",
    "revision": "60a845d22e398b7f9c5fa02893c2680f"
  },
  {
    "url": "viewmodel.js",
    "revision": "10d7f79a57f64ae6ffc736019e73e7e4"
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