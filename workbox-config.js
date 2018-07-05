module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "**/*.{html,json,js,css}",
    "assets/*.{png,jpg}"
  ],
  "swSrc": "app/sw-base.js",
  "swDest": "app/sw.js",
  "globIgnores": [
    "./workbox-config.js"
  ]
};