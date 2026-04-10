const cacheName = 'lahzet-zikr-v2';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/intro.css',
  '/image/logo.png',
  // روابط صفحات الأذكار كاملة
  '/azkar-sabah.html',
  '/azkar-massa.html',
  '/azkar-elnom.html',
  '/azkar-wakeup.html',
  '/azkar-exit-home.html',
  '/azkar-enter-home.html',
  '/doaa-going-masjed.html',
  '/doaa-enter-masjed.html',
  '/doaa-exit-masjed.html',
  '/azkar-after-elsalah.html',
  '/fazl-salat-nabi.html'
];

// مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching all assets...');
      return cache.addAll(assets);
    })
  );
});

// مرحلة التفعيل: مسح الكاش القديم (v1) وتشغيل الجديد
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// مرحلة جلب البيانات: تشغيل الموقع بدون إنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // لو الملف موجود في الكاش رجعه، لو مش موجود هاته من النت
      return response || fetch(e.request);
    })
  );
});