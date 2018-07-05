importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/, 
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts'  
}));

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "88dfe962085c4a0d05de5141f1b6df7f"
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
    "revision": "23b059eb415c018637a98ca7db1d3603"
  },
  {
    "url": "style.css",
    "revision": "85ecc83bc3b234d59c77cd6af8958637"
  },
  {
    "url": "sw-base.js",
    "revision": "2631ed4be51c509b632293c751630ea2"
  },
  {
    "url": "viewmodel.js",
    "revision": "32ef08332749f43da45f6d0908bd5aca"
  },
  {
    "url": "assets/not-available.jpg",
    "revision": "f24bfaf606cccf8cba4993655fbc8905"
  },
  {
    "url": "assets/wikipedia-128.png",
    "revision": "32ea0cdcb8e24ea68b3c3c8e266d78ee"
  },
  {
    "url": "assets/wikipedia-144.png",
    "revision": "fb5f942c535d282795fb18357397266f"
  },
  {
    "url": "assets/wikipedia-16.png",
    "revision": "6b01cc54b1ddd6a61884b9f802f236c9"
  },
  {
    "url": "assets/wikipedia-256.png",
    "revision": "316dd5b8aaa7ed4cb456e367e01993d1"
  },
  {
    "url": "assets/wikipedia-32.png",
    "revision": "b7242773779893e3d0db479828a9b6a1"
  },
  {
    "url": "assets/wikipedia-512.png",
    "revision": "0aa259e015bd1202795efb571e98cfc7"
  },
  {
    "url": "assets/wikipedia-64.png",
    "revision": "4da35db3572b5089f505b2b0dff19d5f"
  }
]);