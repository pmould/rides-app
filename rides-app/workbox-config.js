module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,png,jpg,ico,html,js,css}"
  ],
  "swDest": "build/sw.js",
  "swSrc": "src/sw.js",
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
};