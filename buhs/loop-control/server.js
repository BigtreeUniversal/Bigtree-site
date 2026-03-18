const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Pour servir ton interface

let roomProfile = null;

// --- API BIGTREE ---

// Route de Calibration
app.post('/api/calibrate', (req, res) => {
    const { volume, surface, materialsFactor, basePsi } = req.body;
    
    // Purification BigTree
    const rho_star = 11.811; 
    const v = 343;
    const K = rho_star * v;

    roomProfile = {
        constants: { K, rho_star, v, surface, volume },
        psi_target: basePsi || (1 / Math.sqrt(volume)) * materialsFactor,
        timestamp: new Date()
    };
    res.json({ status: "success", profile: roomProfile });
});

// Route de Calcul Temps Réel (Simulation du DSP)
app.post('/api/compute', (req, res) => {
    if (!roomProfile) return res.status(400).json({ error: "Calibrer d'abord" });

    const { occupancy, currentPower } = req.body;
    
    // Logique BigTree : Ψ dynamique
    // On simule l'absorption du public sur la résonance
    const psi_a = Math.exp(-0.005 * occupancy); 
    const psi_measured = roomProfile.psi_target * psi_a;
    const delta_psi = roomProfile.psi_target - psi_measured;

    // Correction adaptative linéaire
    const alpha = 0.1; 
    const new_W = currentPower + (delta_psi * alpha * 100);

    res.json({
        psi_measured: psi_measured.toFixed(4),
        delta_psi: delta_psi.toFixed(4),
        recommended_W: new_W.toFixed(2),
        k_milieu: roomProfile.constants.K
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BUHS Server running on port ${PORT}`));
