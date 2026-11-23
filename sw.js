const CACHE_NAME = "degout-mmi-pwa-v4";

const APP_SHELL = [
  "./",
  "./index.html",
  "./profil.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Nouveaux fichiers (pages légales, polices et bibliothèque hébergées sur le site).
// Ajoutés un par un : si l'un d'eux manque dans le dépôt, l'installation de la PWA n'échoue pas.
const EXTRA_FILES = [
  "./confidentialite.html",
  "./mentions-legales.html",
  "./cgu.html",
  "./legal.css",
  "./site-config.js",
  "./vendor/supabase.js",
  "./fonts/bowlby-one-latin-400-normal.woff2",
  "./fonts/dm-sans-latin-500-normal.woff2",
  "./fonts/dm-sans-latin-700-normal.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(APP_SHELL).then(() =>
        Promise.all(EXTRA_FILES.map(url => cache.add(url).catch(() => {})))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) return;

  event.respondWith(
    fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() =>
      caches.match(request).then(cached =>
        cached || caches.match("./index.html")
      )
    )
  );
});
