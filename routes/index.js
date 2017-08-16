const express = require('express');
const router = express.Router();
const operations = require('../data/data').operations;
const weapons = require('../data/data').weapons;
const gameDig = require('gamedig');
const async = require('async');
const fs = require('fs');
const path = require('path');
const google = require('googleapis');
const Promise = require('promise');


var sheets = google.sheets('v4');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var readFile = Promise.denodeify(require('fs').readFile);
var unit = {};

function authorize(credentials) {
  debugger
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  debugger
  return readFile(TOKEN_PATH).then(token => {
    debugger
    oauth2Client.credentials = JSON.parse(token);
    return oauth2Client;
  })
  .catch(err => {
    debugger
    getNewToken(oauth2Client);
  })
}

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
  debugger
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    code = process.env.AUTH_CODE || code;
    return oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return err;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      return oauth2Client;
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


function getSheet(authClient) {
  var request = {
    spreadsheetId: '1fACPJarTwBQ0Ld0N_LAfuM91D8s5fVu587o7Ymq9tDA',
    range: 'A3:C55',
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'SERIAL_NUMBER',
    auth: authClient,
  };
  sheets.spreadsheets.values.get(request, function(err, response) {
   if (err) {
     console.error(err);
     return;
   }
   unit = response;
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {play: true});
});

router.get('/unit', function(req, res, next) {
  var weekdays=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Load client secrets from a local file.
  readFile('client_secret.json')
  .then(content => {
    debugger
    return authorize(JSON.parse(content));
  })
  .then(authClient => {
    debugger
    var request = {
      spreadsheetId: '1fACPJarTwBQ0Ld0N_LAfuM91D8s5fVu587o7Ymq9tDA',
      range: 'A3:C55',
      valueRenderOption: 'FORMATTED_VALUE',
      dateTimeRenderOption: 'SERIAL_NUMBER',
      auth: authClient,
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
      res.render('unit', {members: response[0].values, ops: operations, weapons: weapons, weekdays: weekdays, play: false });
    });
  })
  .catch(err => {
    debugger
    console.log('Error loading client secret file: ' + err);
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
