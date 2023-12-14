var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const challenges = challengesDAO.findAll();
    res.render('index', { challenges });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
});

module.exports = router;