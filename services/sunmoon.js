
const SunCalc = require('suncalc');

module.exports = function getPositions(lat, lon) {
  const now = new Date();
  const sun = SunCalc.getPosition(now, lat, lon);
  const moon = SunCalc.getMoonPosition(now, lat, lon);

  return {
    sunAzimuth: sun.azimuth,
    sunAltitude: sun.altitude,
    moonAzimuth: moon.azimuth,
    moonAltitude: moon.altitude,
    timestamp: now
  };
};
