const CACHE_NAME = 'lahzet-zikr-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// تثبيت ملفات الموقع في الذاكرة عشان يفتح أسرع ويشتغل أوفلاين
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// تفعيل السيرفس وركر
self.addEventListener('activate', evt => {
  console.log('Service Worker activated');
});

// جلب البيانات من الكاش لو مفيش نت
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});