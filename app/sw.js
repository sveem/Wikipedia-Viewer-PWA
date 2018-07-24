importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");
importScripts('./shared/lodash.js');
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
  var searchInput = getSearchInput(args.url.search);
  var request = args.event.request;
  readAllData('input')
    .then(function (response) {
      var findSearchInput = _.find(response, ['key', searchInput]);
      if (!findSearchInput) {
        fetch(request)
          .then(function (response) {
            var clonedRes = response.clone()
            return clonedRes.json();
          })
          .then(function (response) {
            var pages = response.query.pages
            writeData('input', {
              key: searchInput,
              pages: pages
            })
            return response;
          });
      }
    })

});

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "ae4094c86acc8950818cdf11a4b32827"
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
    "url": "shared/lodash.js",
    "revision": "c5729a02e9d05617360437e8d020a27a"
  },
  {
    "url": "shared/utility.js",
    "revision": "72946019bebd36526301d8707f13912d"
  },
  {
    "url": "style.css",
    "revision": "85ecc83bc3b234d59c77cd6af8958637"
  },
  {
    "url": "sw-base.js",
    "revision": "bc3fcf826cf80be04d18338e1002dc5c"
  },
  {
    "url": "viewmodel.js",
    "revision": "04c2f93b19a19c5103aaa3e967e0ab97"
  }
]);
