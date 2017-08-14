const express = require('express');
const router = express.Router();

router.get('/paypal/return', function(req, res, next) {
  res.render('thankyou', {
    play: false
  })
});

module.exports = router;
