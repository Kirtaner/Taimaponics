const express = require('express');
const app = express();
const router = express.Router();
const Settings = require('../models/settings');

// console.log(global);

// Initialization

settingsMethods = {
  load() {
    Settings.findOne(function(err, settings){
      if (settings) {
        global.settings = settings;
      } else {
        global.settings = {"firstRun" : true};
        console.log(global.settings);
      }
    });
  },
}

router.post('/save', (req, res) => {

});

module.exports = Object.assign(router, settingsMethods);