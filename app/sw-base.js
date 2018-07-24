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

workbox.precaching.precacheAndRoute([]);
