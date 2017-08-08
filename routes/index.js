var express = require('express');
var router = express.Router();
var operations = require('../data/data').operations;
var weapons = require('../data/data').weapons;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/unit', function(req, res, next) {
  res.render('unit', {ops: operations, weapons: weapons });
});

module.exports = router;
