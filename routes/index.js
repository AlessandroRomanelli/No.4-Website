const express = require('express');
const router = express.Router();
const operations = require('../data/data').operations;
const weapons = require('../data/data').weapons;
const awards = require('../data/data').awards;
const gameDig = require('gamedig');
const async = require('async');
const fs = require('fs');
const path = require('path');
const google = require('googleapis');
const Promise = require('promise');


var sheets = google.sheets('v4');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var unit = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {play: true});
});

router.get('/unit', function(req, res, next) {
  var weekdays=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  debugger
  var request = {
    spreadsheetId: '1fACPJarTwBQ0Ld0N_LAfuM91D8s5fVu587o7Ymq9tDA',
    range: 'A3:C59',
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'SERIAL_NUMBER',
    auth: process.env.API_KEY || "AIzaSyC8kYitDoc-HWLZUfN4CUYkGcZG5XFCcS0"
  };
  async.series([
    function(callback) {
      sheets.spreadsheets.values.get(request, function(err, response) {
       if (err) {
         console.error(err);
         return;
       }
       debugger
       callback(null, response);
      });
    }
  ],
  function (err, response) {
    res.render('unit', {members: response[0].values, ops: operations, weapons: weapons, weekdays: weekdays, awards: awards, play: false });
  });
});

router.get('/public', function(req, res, next) {
  let publicServer = {},
      privateServer = {},
      servers = [['arma3', '37.59.43.226', 2312], ['arma3', '37.59.43.226', 2302]];
  function getServer(connectData, callback) {
    let response = {};
    gameDig.query({
      type: connectData[0],
      host: connectData[1],
      port: connectData[2]
    }).then((state) => {
      response = state;
      response.status = 0;
      callback(null, response);
    }).catch((error) => {
      response.status = 2;
      callback(null, response);
    });
  };
  async.parallel({
    publicServer: function(callback) {
      getServer(servers[0], callback);
    },
    privateServer: function(callback) {
      getServer(servers[1], callback);
    }
  }, function(err, results) {
    res.render('public', {
      public: results.publicServer,
      private: results.privateServer,
      play: false
    });
  })
});

router.get('/paypal/return', function(req, res, next) {
  res.render('thankyou', {
    play: false
  })
});

router.get('/videos', function(req,res,next) {
  res.render('videos', {
    play: false
  })
});

router.get('/screenshots', function(req,res,next) {
  let screenshots = [];
  let p = './public/img/screenshots';
  fs.readdir(p, (err, files) => {
    files.filter(function(file) {
      return fs.statSync(p+'/'+file).isFile();
    }).forEach(function (file) {
      screenshots.push(file);
    });
    res.render('screenshots', {
      screenshots: screenshots,
      play: false
    })
  })
});

module.exports = router;
