const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const sunmoon = require('./services/sunmoon.js'); // ← bien vérifier ce chemin

app.get('/sunmoon', (req, res) => {
  const latitude = parseFloat(req.query.lat) || 48.8566;  // Ex : Paris par défaut
  const longitude = parseFloat(req.query.lon) || 2.3522;

  try {
    const data = sunmoon(latitude, longitude);
    res.json(data);
  } catch (error) {
    console.error('Erreur dans /sunmoon :', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`SynchroLink en ligne sur le port ${PORT}`);
});
