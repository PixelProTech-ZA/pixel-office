/* PIXEL OFFICE — service worker
   Goal: after ONE successful load, the app opens and fully works with
   no network at all — including fonts. Cache-first for everything
   we control, network-refresh in the background so updates still land. */

const CACHE_VERSION = 'pixel-office-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_VERSION).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const isPDFEngine = url.hostname === 'cdnjs.cloudflare.com' && (url.pathname.includes('/html2canvas/') || url.pathname.includes('/jspdf/'));
  const isSameOrigin = url.origin === location.origin;

  if (!isSameOrigin && !isFont && !isPDFEngine) return; // don't intercept unrelated cross-origin calls

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req, (isFont || isPDFEngine) ? { mode: 'cors' } : undefined)
        .then(res => {
          // Only cache good, real responses (skip opaque/error noise)
          if (res && (res.status === 200 || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached); // offline and not cached yet → nothing we can do for this one

      // Cache-first: instant load if we have it, refresh happens quietly behind it
      return cached || network;
    })
  );
});
