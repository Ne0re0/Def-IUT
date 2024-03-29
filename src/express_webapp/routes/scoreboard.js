var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET home page. */
router.get('/', isConnected, async function(req, res, next) {
  var users = await fullyDistinguishedUsersDAO.findAll();
  res.render('scoreboard', { title: 'Scoreboard', users:users});
});

module.exports = router;
