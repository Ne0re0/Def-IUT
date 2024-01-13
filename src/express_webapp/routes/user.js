var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
var usersDAO = require('def-iut-database').usersDAO;
var hasTriedDAO = require('def-iut-database').hasTriedDAO;
var ownsDAO = require('def-iut-database').ownsDAO;
const { isConnected } = require('./middlewares/isConnected'); 


/* GET */
router.get('/:idUser', isConnected, function(req, res, next) {

  // Checking ID value
  if (req.params.idUser === undefined ||
      req.params.idUser === ""){
      res.render('usernotfound',{title:"Aucun utilisateur spécifié"});

  }
  const idUser = req.params.idUser
  
    // Fetching from database
    fullyDistinguishedUsersDAO.findByID(idUser)
      .then((user) => {
        // User exists
        if (undefined !== user){
          usersDAO.getHistory(idUser)
          .then((history) => {
            hasTriedDAO.getFlagged(idUser)
            .then((chart) => {
              if (undefined === chart){
                chart = {flagged:[],reward:[]}
              }

              // Modifie

              ownsDAO.getOwnedBadges(idUser)
              .then((ownedBadges) => {
                ownsDAO.getNotOwnedBadges(idUser)
                .then((otherBadges) => {
                  res.render('user', {title:"Utilisateur",user:user , history:history, chart:chart, ownedBadges:ownedBadges, otherBadges,otherBadges});
                })
                .catch((error) => {
                  console.log(error)
                  res.render('usernotfound',{title:"Erreur interne"})
                })
              })
              .catch((error) => {
                console.log(error)
                res.render('usernotfound',{title:"Erreur interne"})
              })
            })
            .catch((error) => {
              console.log(error)
              res.render('usernotfound',{title:"Erreur interne"})
            })
          })
          .catch((error) => {
            console.log(error)
            res.render('usernotfound',{title:"Erreur interne"})
          })
        } else {
          res.render('usernotfound',{title:"Utilisateur inexistant"});
        }
      })
      .catch((error) => {
        // User does not exists
        console.log(error)
        res.render('usernotfound',{title:"Utilisateur inexistant"});
      })
  
});


module.exports = router;
