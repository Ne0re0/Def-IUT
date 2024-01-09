var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control
var session = require('express-session');

/* GET home page. */
router.get('/', isConnected, async function(req, res, next) {
  
  try {
    const challenges = await challengesDAO.findAllKnowingUser(session.user.idUser);
    res.render('index', { title:"Déf'IUT",challenges });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
});


module.exports = router;