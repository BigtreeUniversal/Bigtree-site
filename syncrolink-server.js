
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

// 🕒 Horloge SynchroLink centrale intégrée (référence UTC, sans dérive)

// Trame temps basée sur l'UTC système (recalée chaque seconde)
let latestClockTrame = '';

function updateClockUTC() {
  const now = new Date();                        // heure système
  const unix = Math.floor(now.getTime() / 1000); // secondes UTC
  const iso  = now.toISOString();                // ISO en UTC
  latestClockTrame = `CLK:${unix}|ISO:${iso}|SRC:CLOCK|`;
}
updateClockUTC();
setInterval(updateClockUTC, 1000); // 1 Hz, pas 500 ms

// Battement visuel 2 Hz optionnel (pour SynchroLink)
let BEAT = 0;
setInterval(() => { BEAT = 1 - BEAT; }, 500);

// Route horloge (compat)
app.get('/clock/latest', (req, res) => {
  res.json({ trame: latestClockTrame, beat: BEAT });
});

// Route temps brute (diagnostic)
app.get('/time', (req, res) => {
  const now = new Date();
  res.set('Cache-Control', 'no-store');
  res.json({
    unix: Math.floor(now.getTime() / 1000),
    iso_utc: now.toISOString()
  });
});
