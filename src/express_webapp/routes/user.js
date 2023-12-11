var express = require('express');
var router = express.Router();
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
    usersDAO.findByID(req.query['id'])
      .then((success) => {
        console.log(success)
        // User exists
        res.render('user', { title: success.username });
      })
      .catch((error) => {
        // User does not exists
        res.render('user', { title: 'User Not Found' });
      })
    
  } else {
    // ID contains invalid characters
    res.render('user', { title: 'ID is invalid' });
  }
  
});

module.exports = router;
