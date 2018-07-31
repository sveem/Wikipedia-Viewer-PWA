importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");
importScripts('./services/lodash.js');
importScripts('./services/idb.js');
importScripts('./services/utility.js');
importScripts('./services/helpers.js');

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts'
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
            var clonedRes = response.clone();
            return clonedRes.json();
          })
          .then(function (response) {
            var pages = response.query.pages;
            writeData('pages', {
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
    "revision": "df0f65c9c4b9eb525ee131c6cf98159c"
  },
  {
    "url": "style.css",
    "revision": "019b870f74382f34d10af941606adf03"
  },
  {
    "url": "sw-base.js",
    "revision": "b452a2508c484fd18cd0c482f2dbc618"
  },
  {
    "url": "viewmodel.js",
    "revision": "ba4a1af3841a9e7cf9ab5afa4df5d586"
  }
]);