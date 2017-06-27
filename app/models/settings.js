const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const settingsSchema = Schema({
  system: {
    serial: {
      _id: false,
      port: String,
      baudRate: { type: Number, default: '9600' },
      dataBits: { type: Number, min: 5, max: 8, default: 8 },
      stopBits: { type: Number, min: 1, max: 2, default: 1 },
      parity: { type: String, default: 'none' }
    },
  },
  logging: {
    logInterval: Number
  }
});

module.exports = mongoose.model('Settings', settingsSchema);