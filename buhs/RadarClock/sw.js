const CACHE_NAME = 'buhs-Control-Tower-v2'; // Changez le 'v1' en 'v2' dès que vous modifiez un fichier
const ASSETS_TO_CACHE = [
  './Bigtree_WorldCam_Explorer.html',
  './manifest.json',
  './ring.jpg',
  './icon-192.png',
  './icon-512.png'
];

// Installation : Mise en cache des fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache ouvert');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Nettoyage : On supprime les vieux caches (important si vous avez changé de nom de projet)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache :', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie : Réseau d'abord (Network First)
// Si internet est là, on prend le frais (image webcam), sinon on pioche dans le cache.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
