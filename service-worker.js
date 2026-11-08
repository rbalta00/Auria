// Service worker compartido por las dos PWA de este repo (catálogo público = index.html,
// administrador = admin.html). Mismo patrón "red primero, cache de respaldo" ya usado en
// otros proyectos del usuario (ver cotizador-fv-cfe-web/service-worker.js). Los pedidos
// (admin.html) viven en Supabase, nunca en este cache.

const CACHE_NOMBRE = "auria-pwa-v2";

const ARCHIVOS_APP_SHELL = [
  "./index.html",
  "./admin.html",
  "./manifest.json",
  "./admin-manifest.json",
  "./catalogo.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NOMBRE).then((cache) => cache.addAll(ARCHIVOS_APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(nombres.filter((n) => n !== CACHE_NOMBRE).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const esNavegacion = event.request.mode === "navigate";
  const esAdmin = event.request.url.includes("admin.html");

  event.respondWith(
    fetch(event.request)
      .then((respuestaRed) => {
        const copia = respuestaRed.clone();
        caches.open(CACHE_NOMBRE).then((cache) => cache.put(event.request, copia));
        return respuestaRed;
      })
      .catch(() =>
        caches.match(event.request).then((r) => {
          if (r) return r;
          if (esNavegacion) return caches.match(esAdmin ? "./admin.html" : "./index.html");
          return undefined;
        })
      )
  );
});
