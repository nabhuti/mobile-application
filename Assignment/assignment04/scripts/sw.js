// Files to cache
var cacheName = 'assignement3';
var appShellFiles = [
  '/mobile-application/Assignement3/',
  '/mobile-application/Assignement3/index.html',
  '/mobile-application/Assignement3/bulma.min.css',
  '/mobile-application/Assignement3/application.css',
  '/mobile-application/Assignement3/scripts/main.js',
  '/mobile-application/Assignement3/scripts/sw.js',
  '/mobile-application/Assignement3/manifest.json',
  
  '/mobile-application/Assignement3/transportation.jpeg',

  
];

var contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});