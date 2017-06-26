const global = require('./global');
var config = global.config;

var sensors = {
  roomTemperature: 0,
  relativeHumidity: 0,
  waterTemperature: 0,
  relays: [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false
  ]
};

console.log('Mock serial connection active');

function randomInt(low, high)
{
  return Math.floor(Math.random() * (high - low) + low);
}

// modifies relay activation state list
function setRelayStatus(mode, relay)
{
  sensors.relays[relay] = mode;
}

function updateSensors()
{
  let string = mockSerial.getRoomTemperature() + " " + mockSerial.getHumidity() + " " + mockSerial.getWaterTemperature();
  let sensorArray = string.split(" ");

  sensors.roomTemperature = sensorArray[0];
  sensors.relativeHumidity = sensorArray[1];
  sensors.waterTemperature = sensorArray[2];
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
      setRelayStatus(true, command.charAt(1));
    }
    if (commandIntent == 'c') {
      setRelayStatus(false, command.charAt(1));
    }
  },

  activateRelay(relay) {
    this.serialCommand('o'+relay);
    return sensors.relays;
  },

  deactivateRelay(relay) {
    this.serialCommand('c'+relay);
    return sensors.relays;
  },

  getRelayStatus() {
    return sensors.relays;
  },
}

setInterval(updateSensors, 2000);

module.exports = mockSerial;
module.exports.sensors = sensors;

// Update the mock sensors!
// updateSensors();
