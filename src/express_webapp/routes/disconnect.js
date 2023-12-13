var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    session.user = undefined;
  }
  res.redirect("/connect");
});

module.exports = router;
