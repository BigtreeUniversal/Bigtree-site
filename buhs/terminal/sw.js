self.addEventListener('fetch', function(event) {
  // Ce script permet l'installation sans forcément gérer le cache hors-ligne complexe
  event.respondWith(fetch(event.request));
});
