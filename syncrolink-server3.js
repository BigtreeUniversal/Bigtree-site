
const express = require('express');
const cors = require('cors');
const app = express();
const sunmoon = require('./services/sunmoon');
const PORT = process.env.PORT || 3000;

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

let lastTrame = null;

app.post('/gps', (req, res) => {
  const trame = req.body.trame;
  if (!trame) {
    return res.status(400).json({ error: 'Trame manquante' });
  }

  console.log("🛰️ Trame GPS reçue :", trame);
  lastTrame = trame;

  res.status(200).json({ status: 'OK', received: trame });
});

app.get('/gps/latest', (req, res) => {
  if (!lastTrame) {
    return res.status(404).json({ error: 'Aucune trame GPS disponible' });
  }
  res.json({ latest: lastTrame });
});


app.get('/sunmoon', (req, res) => {
  const lat = parseFloat(req.query.lat) || 48.8566;
  const lon = parseFloat(req.query.lon) || 2.3522;

  try {
    const data = sunmoon(lat, lon);
    res.json(data);
  } catch (error) {
    console.error('Erreur dans /sunmoon :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ SynchroLink serveur actif sur le port ${PORT}`);
});
