var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET home page. */
router.get('/', isConnected, function(req, res, next) {
  // Verification de la session 
  //console.log("Session admin " +session.user.isAdmin); 
  if (session.user.isAdmin == 1){
    console.log("Avant find all challenge");
    challengesDAO.findAll()
    .then(challenges => {
        console.log('Liste des challenges :', challenges);
        res.render('adminChallenges', { title: 'Admin Panel', challenges: challenges });
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        res.render('error', { title: 'Erreur lors de la récupération des challenges' });
    });
  }else{
    res.render('error', { title: 'Vous n avez pas de session' });
  }
  
});
router.post('/', function(req, res, next) {
});


module.exports = router;