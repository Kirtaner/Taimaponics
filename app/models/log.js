const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const logSchema = Schema({
    time: Date,
    sensors: Array
});

module.exports = mongoose.model('Log', logSchema);