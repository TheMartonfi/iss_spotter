const { fetchMyIP, fetchCoordsByIP, fetchIISFlyOverTimes } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('70.77.198.94', (err, data) => {
//   console.log(err, data);
// });

// fetchCoordsByIP('70.77.198.94', (err, data) => {
//   console.log(err, data);
// });

// fetchIISFlyOverTimes({ latitude: '49.09980', longitude: '-117.70220' }, (err, data) => {
//   console.log(err, data);
// });