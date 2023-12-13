var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(session);
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('connect', { title: 'Connect' });
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  if (req.body === undefined ||
      req.body.password === undefined ||
      req.body.username === undefined ||
      req.body.password === '' ||
      req.body.username === ''
  ){
    res.render('connect', { title: 'Connect' });
  } else {
    console.log(req.body);
    usersDAO.connect(req.body.username, req.body.password)
      .then((connected) => {
        console.log(connected);
        session.user = connected;
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err)
        res.render('connect', { title: 'Connect', failed: err });
      });
  }
});

module.exports = router;
