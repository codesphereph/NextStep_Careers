// NextStep - Service Worker
const CACHE_NAME = 'nextstep-v2';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon.png', 'icon-192.png',
  'apple-touch-icon.png', 'apple-touch-icon-167.png', 'apple-touch-icon-152.png', 'apple-touch-icon-120.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  // Only handle this site's own files. The Apps Script app must always come from the network.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
