const { nextISSTimesForMyLocation } = require('./iss_promised');

const printFlyOverTime = (passTimes) => {
  
  for (const pass of passTimes) {
    const unix_timestamp = pass.risetime;
    const date = new Date(unix_timestamp * 1000);

    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printFlyOverTime(passTimes);
  })
  .catch((err) => {
    console.log(`It didn't work: `, err.message);
  });
