const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Exemple de route simple
app.get('/', (req, res) => {
  res.send('Serveur SynchroLink opérationnel');
});

// Route pour récupérer des données soleil/lune
const sunmoon = require('./services/sunmoon.js');
app.get('/api/sunmoon', async (req, res) => {
  try {
    const data = await sunmoon.getSunMoonData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de récupération des données' });
  }
});

// Route Binance (si utilisée)
const binance = require('./services/binance.js');
app.get('/api/binance', async (req, res) => {
  try {
    const data = await binance.getPriceData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur Binance' });
  }
});

app.listen(PORT, () => {
  console.log(`SynchroLink en ligne sur le port ${PORT}`);
});
