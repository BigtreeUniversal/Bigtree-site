const SunCalc = require('suncalc');

function getSunMoonPosition(lat = 0, lon = 0, date = new Date()) {
  const sun = SunCalc.getPosition(date, lat, lon);
  const moon = SunCalc.getMoonPosition(date, lat, lon);

  return {
    sun: {
      azimuth: (sun.azimuth * 180 / Math.PI + 180) % 360,
      altitude: sun.altitude * 180 / Math.PI
    },
    moon: {
      azimuth: (moon.azimuth * 180 / Math.PI + 180) % 360,
      altitude: moon.altitude * 180 / Math.PI
    }
  };
}

module.exports = { getSunMoonPosition };
