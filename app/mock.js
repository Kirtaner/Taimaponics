var global = require('./global');
var config = global.config;
var sensors;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
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

  activateRelay: function(relay) {

  },

  deactivateRelay: function(relay) {

  },

  getRelayStatus: function() {

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
