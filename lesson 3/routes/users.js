var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/angular', (req, res, next) => {
  res.send('You have hit the angular endpoint');
});

router.get('/express', (req, res, next) => {
  res.send('You have hit the express endpoint');
});

module.exports = router;
