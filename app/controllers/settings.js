const express = require('express');
const app = express();
const router = express.Router();
const Settings = require('../models/settings');

settingsMethods = {
  // Initialization

  load(callback) {
    Settings.findOne(function(err, settings){
      if (!settings) {
        let settings = {"firstRun" : true};
        callback(settings);
      }
    });
  },
}

router.post('/save', (req, res) => {

});

module.exports = Object.assign(router, settingsMethods);