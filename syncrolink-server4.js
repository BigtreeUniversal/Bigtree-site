// === syncrolink-server.js ===

const express = require("express"); const cors = require("cors"); const app = express(); const PORT = process.env.PORT || 3000;

const getSunMoonData = require("./services/sunmoon"); const getBinanceData = require("./services/binance");

app.use(cors());

// Test route app.get("/", (req, res) => { res.json({ message: "Le serveur SynchroLink répond ✅" }); });

// Route Binance app.get("/binance", async (req, res) => { try { const data = await getBinanceData(); res.json(data); } catch (err) { console.error("Erreur Binance:", err); res.status(500).json({ error: "Erreur lors de la récupération Binance" }); } });

// Route Soleil & Lune app.get("/sunmoon", async (req, res) => { try { const date = req.query.date || new Date().toISOString(); const result = await getSunMoonData(date); res.json(result); } catch (err) { console.error("Erreur SunMoon:", err); res.status(500).json({ error: "Erreur lors de la récupération Soleil/Lune" }); } });

app.listen(PORT, () => { console.log(SynchroLink en ligne sur le port ${PORT}); });

