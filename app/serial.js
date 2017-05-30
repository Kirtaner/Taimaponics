var global = require('./global');
var config = global.config;
var SerialPort = require("serialport");
var crypto = require('crypto');
var sensors;

/**
 * Arduino serial connection.
 */
port = new SerialPort(config.get('Serial.port'), {
  baudrate: config.get('Serial.baudrate'),
  flowControl: config.get('Serial.flowControl'),
  dataBits: config.get('Serial.dataBits'),
  stopBits: config.get('Serial.stopBits'),
  parity: config.get('Serial.parity'),
});

port.on("open", function () {
  console.log('Serial connection established');

  /* Output buffering is required because for some reason serial output gets slightly scrambled */
  var buffer;

  port.on('data', function(data) {
    for (i = 0; i < data.length; i++) {
      if (data[i] != 10 || data[i] != 13) {
        buffer += String.fromCharCode(data[i]);
      }
      if (data[i] == 13) {
        if (buffer.length > 0) {
          var reading = buffer.replace(/\n|\r/g, '').toString();
          updateSensors(reading);
          buffer = '';
        }
      }
    }
  });
});

function updateSensors(data)
{
  var sensorArray = data.split(" ");
  sensors = sensorArray;
  module.exports.sensors = sensors;
}

function serialChecksum(data)
{

}

module.exports = {
  getRoomTemperature: function () {
    console.log('lel');
  },

  getRoomTemperature: function() {

  },

  getHumidity: function() {

  },

  getWaterLevel: function() {

  },

  activateRelay: function(relay) {
    var command = 'o'+relay;
    port.write(command);
  },

  deactivateRelay: function(relay) {
    var command = 'c'+relay;
    port.write(command);
  },

  getRelayStatus: function() {

  },
}

module.exports.port = port;
