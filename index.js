const { nextISSTimesForMyLocation } = require('./iss');

const printFlyOverTime = (passTimes) => {
  
  for (const pass of passTimes) {
    const unix_timestamp = pass.risetime;
    const date = new Date(unix_timestamp * 1000);

    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, passTimes) => {

  if (err) {
    return console.log("It didn't work!", err);
  }

  printFlyOverTime(passTimes);
});