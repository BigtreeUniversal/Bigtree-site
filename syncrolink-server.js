const express = require('express');
const cors = require('cors');
const { connectToBinance, getPrice } = require('./services/binance');
const { getSunMoonPosition } = require('./services/sunmoon');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Le serveur SynchroLink répond ✅');
});

// Route pour les données crypto
app.get('/crypto', (req, res) => {
  const price = getPrice();
  if (price) {
    res.json({ symbol: 'BTC/USDT', price });
  } else {
    res.status(503).json({ error: 'Pas encore de données Binance' });
  }
});

// ✅ Route pour la position du Soleil et de la Lune
app.get('/sunmoon', (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || 0;
    const lon = parseFloat(req.query.lon) || 0;
    const position = getSunMoonPosition(lat, lon);
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de calcul des positions', details: error.toString() });
  }
});

connectToBinance();

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
