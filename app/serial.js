var global = require('./global');
var config = global.config;
var SerialPort = require("serialport");
var crypto = require('crypto');

// var relayStatus = "00000000";
var sensors = {
  roomTemperature: 0,
  relativeHumidity: 0,
  waterTemperature: 0,
  relays: Array.from("00000000").map(Number)
};

/**
 * Arduino serial connection.
 */

port = new SerialPort(config.get('Serial.port'), {
  baudrate: config.get('Serial.baudrate'),
  flowControl: config.get('Serial.flowControl'),
  dataBits: config.get('Serial.dataBits'),
  stopBits: config.get('Serial.stopBits'),
  parity: config.get('Serial.parity'),
}, function(err) {
  console.log(err);
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
  let sensorArray = data.split(" ");
  let relayArray = Array.from(sensorArray[3].toString()).map(Number);

  sensors.roomTemperature = sensorArray[0];
  sensors.relativeHumidity = sensorArray[1];
  sensors.waterTemperature = sensorArray[2];
  sensors.relays = relayArray;

  module.exports.sensors = sensors;
}

serial = {
  getRoomTemperature() {
    return sensors.roomTemperature;
  },

  getHumidity() {
    return sensors.relativeHumidity;
  },

  getWaterTemperature() {
    return sensors.waterTemperature;
  },

  getWaterLevel() {
    return;
  },

  activateRelay(relay) {
    let command = 'o'+relay;
    port.write(command);
  },

  deactivateRelay(relay) {
    let command = 'c'+relay;
    port.write(command);
  },

  getRelayStatus() {
    return sensors.relays;
  },

  getDeviceList() {
    SerialPort.list(function(err, list) {
      return list;
    });
  }
}

module.exports = serial;
module.exports.sensors = sensors;
module.exports.port = port;
