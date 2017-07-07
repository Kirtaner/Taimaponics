const VERSION = '0.1.0';

/**
 * Module dependencies.
 */
const colors = require('colors');
const path = require('path');
const fs = require('fs');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
// var flash = require('express-flash');
// var session = require('express-session');
// var errorHandler = require('errorhandler');
// var lusca = require('lusca');
// var MongoStore = require('connect-mongo')(session);

const titleBlock = `
#####################################
#                                   #
# * * * * Taimaponics ${VERSION} * * * * #
#                                   #
#####################################
`;
// console.log(`*** Launching Taimaponics v${VERSION} ***`.green.bgBlack.bold);
console.log(titleBlock.green.bgBlack.bold);

/**
 * Load environment variables from .env file, and load configuration
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({ path: '.env.example' });
global.config = require('config');
const config = global.config;

/**
 * Controllers
 */
const user = require('./app/controllers/user');
const settings = require('./app/controllers/settings');

/**
 * Connect to MongoDB and load settings
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.'.red);
  process.exit(1);
});

mongoose.connection.on('connected', function (ref) {
  console.log('Connected to MongoDB server.'.green);

  // load application settings from mongodb collection
  settings.load(function(data) {
    global.settings = data;

    // firstRun is set if no Mongo collection is returned
    if (global.settings.firstRun) {
      console.log('*** Application settings not found - launching in setup mode ***'.yellow.bold);
    }
  });
});

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
 * MongoDB serial data logger
 */

if (config.get('Logger.enabled')) {
  global.logger = require('./app/logger');
}

/**
 * Create Express and SocketIO server.
 */
const app = express();
const server = require('http').createServer(app);
global.io = require('socket.io').listen(server);
const socket = require('./app/socket');

/**
 * Express configuration.
 */
app.set('port', config.get('Server.port') || 3000);
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// App config
app.get('/config.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'config/development.json'));
});

// Point static path to dist for angular 2
app.use(express.static(path.join(__dirname, 'dist')));

// Authentication
app.use('/api/user', user);

// Settings
app.use('/api/settings', settings);

// catchall non-api route for angular 2
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Start Express server.
 */
server.listen(app.get('port'), function() {
  console.log('Server listening on port %d in %s mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;