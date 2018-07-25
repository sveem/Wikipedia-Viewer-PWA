importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");
importScripts('./services/lodash.js');
importScripts('./services/idb.js');
importScripts('./services/utility.js');
importScripts('./services/helpers.js');

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
  var searchInput = getSearchInputFromUrl(args.url.search);
  var request = args.event.request;
  readAllData('pages')
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
            writeData('pages', {
              key: searchInput,
              pages: pages
            })
            return response;
          });
      }
    })

});

workbox.precaching.precacheAndRoute([{
    "url": "index.html",
    "revision": "56eb3eff0d0813b7ca23489f2da71f5d"
  },
  {
    "url": "manifest.json",
    "revision": "f3ed9a89c04b199f320bafb978490095"
  },
  {
    "url": "services/helpers.js",
    "revision": "9ded6869d8408a1e3b44e93a6fcdf3e8"
  },
  {
    "url": "services/idb.js",
    "revision": "edfbee0bb03a5947b5a680c980ecdc9f"
  },
  {
    "url": "services/lodash.js",
    "revision": "c5729a02e9d05617360437e8d020a27a"
  },
  {
    "url": "services/utility.js",
    "revision": "5f2b90ecea21699f5ff0cff6a4868df6"
  },
  {
    "url": "style.css",
    "revision": "019b870f74382f34d10af941606adf03"
  },
  {
    "url": "sw-base.js",
    "revision": "3dd8e7241a2382aff136bc86fe4a1a66"
  },
  {
    "url": "viewmodel.js",
    "revision": "45e63d782f92fd5f301092831f77b1c0"
  }
]);
