const express = require('express');
const cors = require('cors');
const { connectToBinance, getPrice } = require('./services/binance');
const { getSunMoonPosition } = require('./services/sunmoon'); // 👈 ajout

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Test de connexion
app.get('/', (req, res) => {
  res.send('Le serveur SynchroLink répond ✅');
});

// ✅ Prix crypto BTC/USDT
app.get('/crypto', (req, res) => {
  const price = getPrice();
  if (price) {
    res.json({ symbol: 'BTC/USDT', price });
  } else {
    res.status(503).json({ error: 'Pas encore de données Binance' });
  }
});

// ✅ Positions Soleil & Lune
app.get('/sunmoon', (req, res) => {
  try {
    const position = getSunMoonPosition(); // extrait date courante automatiquement
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de calcul des positions' });
  }
});

// ✅ Connexion Binance en WebSocket
connectToBinance();

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
