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

function countArray(array) {
  var counter = 0;
  for(k=0; k < array.length; i++) {
    if (array[k][0]  != null) {
      counter ++;
    }
  }
  return counter;
}


function groupSections(data, array) {
  var sections = ["hq", "medical", "ablehq", "ablesubone", "ablesubtwo",
  "bakerhq", "bakersubone", "bakersubtwo", "flight",
  "weaponshq", "weapon1", "weapon2", "weapon3", "weapon4"];
  for (j=0; j < sections.length; j++) {
    if (j < 5) {
      data[sections[j]] = reorderSpreadsheetArray(array, 0, 13, j);
    }
    if (j >= 5 && j < 8) {
      data[sections[j]] = reorderSpreadsheetArray(array, 14, 27, j-3);
    }
    if (j == 8) {
      data[sections[j]] = reorderSpreadsheetArray(array, 14, 27, 0);
    }
    if (j > 8){
      data[sections[j]] = reorderSpreadsheetArray(array, 28, 36, j-9);
    }
  }

  for (var propertyName in data) {
    data[propertyName] = [data[propertyName], data[propertyName].pop()[2]]
  }

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
    range: "Production!A2:O37",
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
