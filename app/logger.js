const moment = require('moment');
const global = require('./global');
const Log = require('./models/log');
const io = global.io;
const serial = global.serial;

const logger = {};

logger.writeLog = function(time, data) {
  let logEntry = new Log();

  logEntry.time = time;
  logEntry.sensors = data;

  logEntry.save( (err) => {
    if ( err )
      throw err;

    return;
  });
}

logger.logSensors = function() {
  let currentData = serial.sensors;
  let currentTime = moment();
  
  logger.writeLog(currentTime, currentData);
  return;
}

logger.getLogs = function() {
  return;
}

// TODO: Make this configurable and cleaner.
setInterval( function() {
  logger.logSensors();
}, 1000*60*5);

module.exports = logger;