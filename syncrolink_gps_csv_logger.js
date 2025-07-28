const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/gps', (req, res) => {
  const trame = req.body.trame;
  if (!trame) return res.status(400).json({ error: 'Trame manquante' });

  console.log("🛰️ Trame GPS reçue :", trame);

  const match = trame.match(/LAT:([\d.-]+)\|LONG:([\d.-]+)\|ALT:([\d.-]+)\|CLK:(\d+)/);
  if (match) {
    const lat = match[1];
    const lon = match[2];
    const alt = match[3];
    const clk = match[4];
    const line = `${clk},${lat},${lon},${alt}\n`;

    fs.appendFile("gps_data.csv", line, (err) => {
      if (err) console.error("Erreur écriture CSV :", err);
    });
  }

  res.status(200).json({ status: "OK", received: trame });
});

app.get('/gps/csv', (req, res) => {
  const path = "gps_data.csv";
  if (fs.existsSync(path)) {
    res.sendFile(path, { root: __dirname });
  } else {
    res.status(404).send("Pas de données disponibles.");
  }
});

app.listen(PORT, () => {
  console.log(`📡 Serveur GPS CSV actif sur port ${PORT}`);
});
