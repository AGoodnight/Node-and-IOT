var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Express',
  	users_url: '/users',
  	text:{
  		users:'Go to Users',
  		google:'Go to Google'
  	} 
  });
});

module.exports = router;
