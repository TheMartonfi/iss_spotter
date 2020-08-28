const request = require('request');

const fetchMyIP = (done) => {
  
  request('https://api.ipify.org?format=json', (err, response, body) => {
    
    if (err) {
      done(err, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      done(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body).ip;
    done(null, IP);

  });
};

const fetchCoordsByIP = (IP, done) => {
  request(`https://ipvigilante.com/${IP}`, (err, response, body) => {
    
    const data = JSON.parse(body);

    if (err) {
      done(err, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      done(Error(msg), null);
      return;
    }

    const coordinates = { latitude: data.data.latitude, longitude: data.data.longitude };
    done(null, coordinates);

  });
};

const fetchIISFlyOverTimes = (coordinates, done) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}&n=5`, (err, response, body) => {

    if (err) {
      done(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      done(Error(msg), null);
      return;
    }

    const flyOverTime = JSON.parse(body).response;
    done(null, flyOverTime);

  });

};

const nextISSTimesForMyLocation = (done) => {

  fetchMyIP((err, IP) => {
    if (err) return done(err, null);

    fetchCoordsByIP(IP, (err, coordinates) => {
      if (err) return done(err, null);

      fetchIISFlyOverTimes(coordinates, (err, flyOverTime) => {
        if (err) return done(err, null);

          done(err, flyOverTime);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };