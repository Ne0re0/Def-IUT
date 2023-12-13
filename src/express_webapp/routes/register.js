var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Créer un compte' });
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
      req.body['password-confirmation'] === '' 
    ){
      res.render('register', { title: 'Créer un compte', body:req.body, error:"Au moins un champ n'a pas été rempli" });
      return;
  }
  console.log(req.body)

  // Check email
  if (!req.body.email.match(/^[A-Za-z0-9._%+-]+@.*univ-ubs\.fr$/)){
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Format de l'adresse e-mail invalide" });
    return;
  }
  console.log(req.body)

  // Check that password respects the password policy
  if(
    !req.body.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
    !req.body.password.match(".*\\d.*") ||
    !req.body.password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ||
    !req.body.password.length>7
  ){
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Le mot de passe ne respecte pas les conditions" });
    return;
  }
  console.log(req.body)
  
  // Check confirmation

  if (req.body.password !== req.body['password-confirmation']){
    res.render('register', { title: 'Créer un compte', body:req.body, error:"Mot de passe et confirmation différents" });
    return;
  }

  console.log("test")
  console.log(req.body)

  // Tests passed
  usersDAO.insert(req.body.email,0,req.body.username,req.body.password,0)
    .then((user) => {
      res.redirect("/connect");
    })
    .catch((err) => {
      res.render('register', { title: 'Créer un compte', body:req.body, error:err });
      return;
    })
  // res.redirect("/");
});

module.exports = router;
