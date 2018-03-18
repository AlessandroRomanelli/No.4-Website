const express = require("express");
const router = express.Router();
const operations = require("../data/data").operations;
const weapons = require("../data/data").weapons;
const awards = require("../data/data").awards;
const gameDig = require("gamedig");
const async = require("async");
const fs = require("fs");
const path = require("path");
const google = require("googleapis");
const Promise = require("promise");

var sheets = google.sheets("v4");
var readline = require("readline");
var googleAuth = require("google-auth-library");
var unit = {};

function reorderSpreadsheetArray(array, row1, row2, column) {
  column *= 3;
  var res = [];
  for (i = row1; i < row2; i++) {
    var data = [column, column + 1, column + 2];
    data = data.map(function(x) {
      if (array[i][x]) {
        return array[i][x]
      } else {
        return null
      }
    });
    res.push(data)
  }
  return res
}

function groupSections(data, array) {
  data.hq = reorderSpreadsheetArray(array, 0, 12, 0);
  data.medical = reorderSpreadsheetArray(array, 0, 12, 1);
  data.ablehq = reorderSpreadsheetArray(array, 0, 12, 2);
  data.ablesubone = reorderSpreadsheetArray(array, 0, 12, 3);
  data.ablesubtwo = reorderSpreadsheetArray(array, 0, 12, 4);
  data.bakerhq = reorderSpreadsheetArray(array, 13, 23, 2);
  data.bakersubone = reorderSpreadsheetArray(array, 13, 23, 3);
  data.bakersubtwo = reorderSpreadsheetArray(array, 13, 23, 4);
  data.flight = reorderSpreadsheetArray(array, 13, 23, 0);
  data.weaponshq = reorderSpreadsheetArray(array, 25, 28, 0);
  data.weapon1 = reorderSpreadsheetArray(array, 25, 28, 1);
  data.weapon2 = reorderSpreadsheetArray(array, 25, 28, 2);
  data.weapon3 = reorderSpreadsheetArray(array, 25, 28, 3);
  data.weapon4 = reorderSpreadsheetArray(array, 25, 28, 4);
  return data;
}

/* GET home page. */
router.get("/", function(req, res, next) {
  var weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  res.render("index", { play: true, weekdays: weekdays });
});

router.get("/unit", function(req, res, next) {
  res.render("unit", {
    ops: operations,
    weapons: weapons,
    awards: awards,
    play: false
  });
});

router.get("/unitinfo", function(req, res, next) {
  res.render("unit", {
    ops: operations,
    weapons: weapons,
    awards: awards,
    play: false
  });
});

router.get("/public", function(req, res, next) {
  let publicServer = {},
    privateServer = {},
    servers = [
      ["arma3", "195.140.215.20", 2312],
      ["arma3", "195.140.215.20", 2302],
      ["teamspeak3", "195.140.215.20", 9987]
    ];
  function getServer(connectData, callback) {
    let response = {};
    gameDig
      .query({
        type: connectData[0],
        host: connectData[1],
        port: connectData[2]
      })
      .then(state => {
        response = state;
        response.status = 0;
        callback(null, response);
      })
      .catch(error => {
        response.status = 2;
        callback(null, response);
      });
  }
  async.parallel(
    {
      publicServer: function(callback) {
        getServer(servers[0], callback);
      },
      privateServer: function(callback) {
        getServer(servers[1], callback);
      },
      teamspeakServer: function(callback) {
        getServer(servers[2], callback);
      }
    },
    function(err, results) {
      res.render("public", {
        public: results.publicServer,
        private: results.privateServer,
        ts3: results.teamspeakServer,
        play: false
      });
    }
  );
});

router.get("/paypal/return", function(req, res, next) {
  res.render("thankyou", {
    play: false
  });
});

router.get("/videos", function(req, res, next) {
  res.render("videos", {
    play: false
  });
});

router.get("/screenshots", function(req, res, next) {
  let screenshots = [];
  let p = "./public/img/screenshots";
  fs.readdir(p, (err, files) => {
    files
      .filter(function(file) {
        return fs.statSync(p + "/" + file).isFile();
      })
      .forEach(function(file) {
        screenshots.push(file);
      });
    res.render("screenshots", {
      screenshots: screenshots,
      play: false
    });
  });
});

router.get("/structure", function(req, res, next) {
  var request = {
    spreadsheetId: "1fACPJarTwBQ0Ld0N_LAfuM91D8s5fVu587o7Ymq9tDA",
    range: "Development!A2:O29",
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER",
    auth: process.env.API_KEY || "AIzaSyC8kYitDoc-HWLZUfN4CUYkGcZG5XFCcS0"
  };
  async.series(
    [
      function(callback) {
        sheets.spreadsheets.values.get(request, function(err, res) {
          if (err) {
            console.error(err);
            return;
          }
          callback(null, res);
        });
      }
    ],
    function(err, response) {
      response = response[0].values;
      var data = {}
      data = groupSections(data, response);
      // reorderSpreadsheetArray(array, row1, row2, column)
      res.render("structure", {
        members: data,
        play: false
      });
    }
  );
});

router.get("/donations", function(req, res, next) {
  res.render("donations", { play: false });
});

module.exports = router;
