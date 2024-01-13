var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');
var fs = require('fs');
const LOG_FILE="../../log/defiut.log"

/* GET register page. */
router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('register', { title: 'Créer un compte' });
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  // Check request body exists
  if (req.body === undefined){
    res.render('register', { title: 'Créer un compte' });
    return;
  }
  console.log(req.body)

  // Check that parameters have been specified
  if (
      req.body.username === undefined ||
      req.body.username === '' || 
      req.body.email === undefined ||
      req.body.email === '' ||
      req.body.password === undefined ||
      req.body.password === '' ||
      req.body['password-confirmation'] === undefined ||
      req.body['password-confirmation'] === '' ||
      res.body.cgu != 'on'
    ){

      let event = "User "+req.body.username +"' failed to create an account (empty fields)\n"
      fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
                  
      res.render('register', { title: 'Créer un compte', body:req.body, error:"Au moins un champ n'a pas été rempli" });
      return;
  }

  // Check email
  if (!req.body.email.match(/^[A-Za-z0-9._%+-]+@.*univ-ubs\.fr$/)){

    let event = "User "+req.body.username +"' failed to create an account (email invalid)\n"
    fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
                  
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Format de l'adresse e-mail invalide" });
    return;
  }

  // Check that password respects the password policy
  if(
    !req.body.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
    !req.body.password.match(".*\\d.*") ||
    !req.body.password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ||
    !req.body.password.length>7
  ){
    let event = "User "+req.body.username +"' failed to create an account (password invalid)\n"
    fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
    
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Mot de passe invalide" });
    return;
  }
  
  // Check confirmation

  if (req.body.password !== req.body['password-confirmation']){
    let event = "User "+req.body.username +"' failed to create an account (password confirmation invalid)\n"
    fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
    
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Confirmation invalide" });
    return;
  }

  // Tests passed
  usersDAO.insert(req.body.email,0,req.body.username,req.body.password,0)
    .then((user) => {
      let event = "User "+req.body.email +"' successfully created an account\n"
      fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
    
      res.render('register', { title: 'Créer un compte', body:req.body, success:"Se connecter" });
    })
    .catch((err) => {
      let event = "User "+req.body.email +"' failed to create an account (username of email exists)\n"
      fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
    
      if (err.toString().includes('mail')){
        res.render('register', { title: 'Créer un compte', body:req.body, error:"Adresse mail existante" });
      } else {
        res.render('register', { title: 'Créer un compte', body:req.body, error:"Pseudonyme existant" });
      }
      return;
    })
  // res.redirect("/");
});

module.exports = router;
