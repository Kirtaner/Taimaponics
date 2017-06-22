var global = require('./global');
var config = global.config;
var sensors = {};
var relayStatus = "00000000";

console.log('Mock serial connection active');

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// modifies relay activation state list
function setRelayStatus(relay, mode) {
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
  getRoomTemperature: function () {
    return randomInt(10,30);
  },

  getWaterTemperature: function() {
    return randomInt(10,30);
  },

  getHumidity: function() {
    return randomInt(10,90);
  },

  getWaterLevel: function() {
    return randomInt(4,9);
  },

  serialCommand: function(command){
    let commandIntent = command.charAt(0);

    if(commandIntent == 'o') {
      setRelayStatus(1, command.charAt(1));
    }
    if (commandIntent == 'c') {
      setRelayStatus(0, command.charAt(1));
    }
  },

  activateRelay: function(relay) {
    serialCommand('o'+relay);
    return relayStatus;
  },

  deactivateRelay: function(relay) {
    serialCommand('c'+relay);
    return relayStatus;
  },

  getRelayStatus: function() {
    return relayStatus;
  },
}

module.exports = mockSerial;

// Update the sensors!
setInterval(updateSensors, 2000);