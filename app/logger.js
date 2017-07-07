const moment = require('moment');
const Log = require('./models/log');
const io = global.io;
const serial = global.serial;

Logger = {
  writeLog(time, data) {
    let logEntry = new Log();

    logEntry.time = time;
    logEntry.sensors = data;

    logEntry.save( (err) => {
      if ( err )
        throw err;

      return;
    });
  },

  logSensors() {
    let currentData = serial.sensors;
    let currentTime = moment();

    Logger.writeLog(currentTime, currentData);
    return;
  },

  getLogs() {
    return;
  }
};

const sensorTimer = setInterval(Logger.logSensors, 1000*60*5);

module.exports = Logger;
