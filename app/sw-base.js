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
          var pages = data.query.pages;
          writeData('input', { pages: pages })
          return data;
        });
});

workbox.precaching.precacheAndRoute([]);


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