
const express = require('express');
const SunCalc = require('suncalc');
const router = express.Router();

router.get('/', (req, res) => {
  const lat = parseFloat(req.query.lat) || 0;
  const lon = parseFloat(req.query.lon) || 0;
  const now = new Date();

  const sun = SunCalc.getPosition(now, lat, lon);
  const moon = SunCalc.getMoonPosition(now, lat, lon);

  res.json({
    sun: {
      azimuth: (sun.azimuth * 180 / Math.PI + 180) % 360,
      altitude: sun.altitude * 180 / Math.PI
    },
    moon: {
      azimuth: (moon.azimuth * 180 / Math.PI + 180) % 360,
      altitude: moon.altitude * 180 / Math.PI
    }
  });
});

module.exports = router;
