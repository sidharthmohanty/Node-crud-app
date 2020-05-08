var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next) {
res.render('home',{title:"Home Page"});
});

module.exports = router;