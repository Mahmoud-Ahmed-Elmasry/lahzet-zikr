const cacheName = 'lahzet-zikr-v3'; 
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/intro.css',
  '/css/main.css',
  '/image/logo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',

  // روابط صفحات الأذكار (تأكد أن أسماء ملفات HTML مطابقة لهذه الروابط)
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
  '/fazl-salat-nabi.html',
  //  ملفات الصوت 
  '/sounds/after-salah.mp3',
  '/sounds/azkar-elnom.mp3',
  '/sounds/enter-masjed.mp3',
  '/sounds/exit-home.mp3',
  '/sounds/exit-masjed.mp3',
  '/sounds/going-masjed.mp3',
  '/sounds/massa.mp3',
  '/sounds/sabah.mp3',
  '/sounds/wakeup.mp3',
  '/sounds/enter-home.mp3'
];

// مرحلة التثبيت وحفظ الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('جاري حفظ ملفات الصوت والديزاين...');
      return cache.addAll(assets).catch(err => {
          console.error('هناك ملف مفقود أو اسمه غير مطابق، تأكد من الأسماء:', err);
      });
    })
  );
});

// مرحلة التفعيل وتنظيف الملفات القديمة
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// تشغيل الموقع أوفلاين 
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});