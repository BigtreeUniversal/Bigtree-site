const SunCalc = require('suncalc');

module.exports = function getPositions(lat, lon) {
  const now = new Date();
  const sunPos = SunCalc.getPosition(now, lat, lon);
  const moonPos = SunCalc.getMoonPosition(now, lat, lon);

  return {
    sun: {
      azimuth: sunPos.azimuth,
      altitude: sunPos.altitude
    },
    moon: {
      azimuth: moonPos.azimuth,
      altitude: moonPos.altitude
    },
    timestamp: now
  };
};
