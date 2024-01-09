var express = require('express');
var router = express.Router();
var session = require('express-session');
var fs = require('fs')
const LOG_FILE = "../../log/defiut.log";

/* GET home page. */
router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User '" + session.user.mail + "'' disconnected\n" );
    session.user = undefined;
  }
  res.redirect("/connect");
});

module.exports = router;
