/* Pixel Office service worker
   - Precaches every file so the app works fully offline after one load.
   - Serves from cache instantly, refreshes quietly in the background,
     so a fixed version reaches a machine on its next-but-one open.
   - To release an update: change VERSION below. */
const VERSION = 'pixel-office-v8';
const FILES = [
  "./",
  "./bebas-neue-latin-400-normal.woff2",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./jetbrains-mono-latin-400-normal.woff2",
  "./jetbrains-mono-latin-700-normal.woff2",
  "./manifest.json",
  "./rajdhani-latin-400-normal.woff2",
  "./rajdhani-latin-500-normal.woff2",
  "./rajdhani-latin-600-normal.woff2",
  "./rajdhani-latin-700-normal.woff2"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== VERSION).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      const net = fetch(req, { cache: 'no-cache' }).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()));
      return cached || net;
    })
  );
});
