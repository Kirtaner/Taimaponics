var global = require('./global');
var config = global.config;
var sensors;
var relayStatus = "00000000";

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// modifies relay activation state list
function setRelayStatus(relay, mode) {
    relayStatus = relayStatus.substr(0,relay) + mode + relayStatus.substr(relay+1);
}

/**
 * Mock serial connection.
 */

module.exports = {
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
    var commandIntent = command.charAt(0);

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

function updateSensors()
{
  var string = module.exports.getRoomTemperature() + " " + module.exports.getHumidity() + " " + module.exports.getWaterTemperature() + " " + 11100111;
  var sensorArray = string.split(" ");
  sensors = sensorArray;
  module.exports.sensors = sensors;
}

setInterval(updateSensors, 2000);
