var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
var usersDAO = require('def-iut-database').usersDAO;
var hasTriedDAO = require('def-iut-database').hasTriedDAO;
var ownsDAO = require('def-iut-database').ownsDAO;


/* GET */
router.get('/', function(req, res, next) {

  // Checking ID value
  if (
      req.query['id'] !== undefined && 
      req.query['id'] !== "" &&
      !isNaN(req.query['id'])
  ){
    // Fetching from database
    fullyDistinguishedUsersDAO.findByID(req.query['id'])
      .then((user) => {
        console.log(user)
        // User exists
        if (undefined !== user){
          usersDAO.getHistory(req.query['id'])
          .then((history) => {
            console.log(user);
            console.log(history);
            hasTriedDAO.getFlagged(req.query['id'])
            .then((chart) => {
              if (undefined === chart){
                chart = {flagged:[],reward:[]}
              } 
              console.log(chart)
              ownsDAO.getOwnedBadges(req.query['id'])
              .then((ownedBadges) => {
                console.log("Badges : " + ownedBadges)
                ownsDAO.getNotOwnedBadges(req.query['id'])
                .then((otherBadges) => {
                  console.log(otherBadges);
                  res.render('user', {title:"Utilisateur",user:user , history:history, chart:chart, ownedBadges:ownedBadges, otherBadges,otherBadges});
                })
                .catch((error) => {
                  console.log(error)
                  res.render('usernotfound')
                })
              })
              .catch((error) => {
                console.log(error)
                res.render('usernotfound')
              })
            })
            .catch((error) => {
              console.log(error)
              res.render('usernotfound')
            })
          })
          .catch((error) => {
            console.log(error)
            res.render('usernotfound')
          })
        } else {
          console.log(error)
          res.render('usernotfound',{title:"Utilisateur inexistant"});
        }
      })
      .catch((error) => {
        // User does not exists
        console.log(error)
        res.render('usernotfound',{title:"Utilisateur inexistant"});
      })
    
  } else {
    // ID contains invalid characters
    res.render('usernotfound',{title:"Aucun utilisateur spécifié"});
  }
  
});

module.exports = router;
