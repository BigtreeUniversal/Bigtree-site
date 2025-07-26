const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Autorise toutes les origines (utile pour les tests)
app.use(cors());

app.get('/', (req, res) => {
  res.send('Le serveur répond bien ! ✅');
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
