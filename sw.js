const CACHE_NAME = 'lahzet-zikr-v5';
const assets = [
  '/lahzet-zikr/',
  '/lahzet-zikr/index.html',
  '/lahzet-zikr/manifest.json',
  '/lahzet-zikr/icon-192.png',
  '/lahzet-zikr/icon-512.png',
  '/lahzet-zikr/image/logo.png',
  '/lahzet-zikr/css/intro.css'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});