var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
/* GET home page. */
router.get('/', function(req, res, next) {
  fullyDistinguishedUsersDAO.findAll()
    .then((users) => {
      console.log(users);
      res.render('scoreboard', { title: 'Scoreboard', users:users});
    })
});

module.exports = router;
