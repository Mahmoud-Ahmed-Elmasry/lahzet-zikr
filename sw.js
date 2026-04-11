self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

// السطر ده هو السر.. بيقول للمتصفح: روح هات كل حاجة من النت فوراً
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});