var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
var usersDAO = require('def-iut-database').usersDAO;
var hasTriedDAO = require('def-iut-database').hasTriedDAO;
var ownsDAO = require('def-iut-database').ownsDAO;


/* GET */
router.get('/:idUser', function(req, res, next) {

  // Checking ID value
  console.log(req.params)
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
          console.log(user);
          usersDAO.getHistory(idUser)
          .then((history) => {
            console.log(history);
            hasTriedDAO.getFlagged(idUser)
            .then((chart) => {
              if (undefined === chart){
                chart = {flagged:[],reward:[]}
              } 
              console.log(chart)
              ownsDAO.getOwnedBadges(idUser)
              .then((ownedBadges) => {
                console.log("Badges : " + ownedBadges)
                ownsDAO.getNotOwnedBadges(idUser)
                .then((otherBadges) => {
                  console.log(otherBadges);
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
