const global = require('./global');
var config = global.config;

var relayStatus = "00000000";
var sensors = {
  roomTemperature: 0,
  relativeHumidity: 0,
  waterTemperature: 0,
  relays: Array.from(relayStatus.toString()).map(Number)
};

console.log('Mock serial connection active');

function randomInt(low, high)
{
  return Math.floor(Math.random() * (high - low) + low);
}

// modifies relay activation state list
function setRelayStatus(mode, relay)
{
  console.log('setRelayStatus - Relay: ' + relay);
  console.log('setRelayStatus - Mode: ' + mode);

  relayStatus = relayStatus.substr(0,relay) + mode + relayStatus.substr(relay+1);
}

function updateSensors()
{
  let string = mockSerial.getRoomTemperature() + " " + mockSerial.getHumidity() + " " + mockSerial.getWaterTemperature() + " " + mockSerial.getRelayStatus();
  let sensorArray = string.split(" ");
  let relayArray = Array.from(sensorArray[3].toString()).map(Number);

  sensors.roomTemperature = sensorArray[0];
  sensors.relativeHumidity = sensorArray[1];
  sensors.waterTemperature = sensorArray[2];
  sensors.relays = relayArray;

  module.exports.sensors = sensors;
}

/**
 * Mock serial connection.
 */

mockSerial =  {
  getRoomTemperature() {
    return randomInt(10,30);
  },

  getWaterTemperature() {
    return randomInt(10,30);
  },

  getHumidity() {
    return randomInt(10,90);
  },

  getWaterLevel() {
    return randomInt(4,9);
  },

  serialCommand(command) {
    console.log('serialCommand: '+ command);
    let commandIntent = command.charAt(0);

    if(commandIntent == 'o') {
      setRelayStatus(1, command.charAt(1));
    }
    if (commandIntent == 'c') {
      setRelayStatus(0, command.charAt(1));
    }
    console.log("relayStatus: " + relayStatus);
  },

  activateRelay(relay) {
    this.serialCommand('o'+relay);
    return relayStatus;
  },

  deactivateRelay(relay) {
    this.serialCommand('c'+relay);
    return relayStatus;
  },

  getRelayStatus() {
    return relayStatus;
  },
}

module.exports = mockSerial;

// Update the mock sensors!
updateSensors();
setInterval(updateSensors, 2000);
