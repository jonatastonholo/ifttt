// Author: Jônatas Ribeiro Tonholo
// This script will skip Sonoff 1 channel and 2 channel action when it's occurs before sunset (or before night time, if sunset history is empty or null)

// Will skip actions of 1 and 2 chanel sonoff device
function skipActions() {
  Ewelink.plugAction.skip();
  Ewelink.plugs2Action.skip();
}

// Verify if is daytime
function isDaytime() {
  let hour = currentTime.hour();
  let minute = currentTime.minute();
  return (hour >= 6 && hour < 18)
}

// Getthe current time
let currentTime = moment(Ewelink.wifiDoorSensorTrigger.CreatedAt);

try{  
  // Parse the current time
  let timeNow = Date.parse(currentTime.utc().format());
  // Get the history of sunsets from Weather Underground API and parse
  let timeSunset = Date.parse(Weather.historyOfSunsets[0].SunsetAt);
  
  // Skip if is before the sunset
  if(timeNow < timeSunset) {
      skipActions();
  }
}
catch(e) {
  // If the sunset not occurs yet, the history of sunsets will fail and throw an exception.
  // Skip if is daytime
  if( isDaytime() ) {
    skipActions();
  }
}
