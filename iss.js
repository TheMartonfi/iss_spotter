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

module.exports = { fetchMyIP, fetchCoordsByIP };