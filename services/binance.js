const WebSocket = require('ws');

let latestPrice = null;

const connectToBinance = () => {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

  ws.on('message', (data) => {
    const parsed = JSON.parse(data);
    latestPrice = parsed.c; // "c" = prix de clôture actuel
  });

  ws.on('error', (err) => {
    console.error('WebSocket Binance error :', err);
  });

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée, reconnexion dans 5s...');
    setTimeout(connectToBinance, 5000);
  });
};

const getPrice = () => latestPrice;

module.exports = { connectToBinance, getPrice };
