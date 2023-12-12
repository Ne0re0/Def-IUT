var express = require('express');
var router = express.Router();
var fullyDistinguishedUsersDAO = require('def-iut-database').fullyDistinguishedUsersDAO;
var usersDAO = require('def-iut-database').usersDAO;


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
            res.render('user', {user:user , history:history});
          })
          .catch((error) => {
            console.log(error)
            res.render('usernotfound')
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
    
  } else {
    // ID contains invalid characters
    res.render('usernotfound',{title:"Aucun utilisateur spécifié"});
  }
  
});

module.exports = router;
