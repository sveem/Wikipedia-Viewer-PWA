module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "**/*.{html,json,js,css}"
  ],
  "swSrc": "app/sw-base.js",
  "swDest": "app/sw.js",
  "globIgnores": [
    "./workbox-config.js",
    "assets/**"
  ]
};