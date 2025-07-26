const express = require('express');
const cors = require('cors');
const { connectToBinance, getPrice } = require('./services/binance'); // 👈 ajout

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Route principale de test
app.get('/', (req, res) => {
  res.send('Le serveur SynchroLink répond ✅');
});

// Route crypto pour obtenir le dernier prix BTC/USDT
app.get('/crypto', (req, res) => {
  const price = getPrice();
  if (price) {
    res.json({ symbol: 'BTC/USDT', price });
  } else {
    res.status(503).json({ error: 'Pas encore de données Binance' });
  }
});

// Connexion WebSocket Binance
connectToBinance();

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
