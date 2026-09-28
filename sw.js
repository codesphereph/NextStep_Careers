// NextStep Prototype - Service Worker
// The prototype is one self-contained file, so caching it makes the whole
// demo work with no internet at all.
const CACHE_NAME = 'nextstep-prototype-v3';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon.png', 'icon-192.png',
  'apple-touch-icon.png', 'apple-touch-icon-167.png', 'apple-touch-icon-152.png', 'apple-touch-icon-120.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; })
                             .map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(function (r) { return r || fetch(event.request); }));
});
