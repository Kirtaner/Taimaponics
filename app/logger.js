const moment = require('moment');
const global = require('./global');
const Log = require('./models/log');
const io = global.io;
const serial = global.serial;

function writeLog(time, data) {
  let logEntry = new Log();

  logEntry.time = time;
  logEntry.sensors = data;

  logEntry.save( (err) => {
    if ( err )
      throw err;

    return;
  });
}

module.exports = {
  logSensors: function() {
    let currentData = serial.sensors;
    let currentTime = moment();
    
    writeLog(currentTime, currentData);
    return;
  },
  getLogs: function() {
    return;
  }
}
