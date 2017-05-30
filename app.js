/**
 * Module dependencies.
 */
var express = require('express');
var compress = require('compression');
// var flash = require('express-flash');
// var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
// var errorHandler = require('errorhandler');
// var lusca = require('lusca');
var dotenv = require('dotenv');
// var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var expressValidator = require('express-validator');

/**
 * Global namespace for common modules
 */
var global = require('./app/global');
global.config = require('config');
var config = global.config;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({ path: '.env.example' });

/**
 * If Arduino hardware is present and enabled, use a real serial port
 *
 * Otherwise, we have a mock serial connection so everything still "works"
 */
if (config.get('Serial.enabled')) {
  global.serial = require('./app/serial');
} else {
  global.serial = require('./app/mock');
}

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Create Express and SocketIO server.
 */
var app = express();
var server = require('http').createServer(app);
global.io = require('socket.io').listen(server);
var socket = require('./app/socket');

/**
 * Express configuration.
 */
app.set('port', config.get('Server.port') || 3000);
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Start Express server.
 */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;