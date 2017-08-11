const express = require('express');
const router = express.Router();
const operations = require('../data/data').operations;
const weapons = require('../data/data').weapons;
const gameDig = require('gamedig');
const async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {play: true});
});

router.get('/unit', function(req, res, next) {
  var date = new Date();
  var day = date.getDay();
  var weekdays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var nextDays = [];
  for (var i = 0; i < 7; i++) {
    if (day > 6) {
      day = 0;
    }
    nextDays.push(weekdays[day]);
    day += 1;
  }
  console.log(nextDays);
  res.render('unit', {ops: operations, weapons: weapons, weekdays: nextDays, play: false });
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

module.exports = router;
