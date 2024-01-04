var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');
const fs = require('fs');

router.get('/:token', function(req, res, next) {
    const token = req.params.token;
    if (session.user !== undefined){
      res.redirect("/");
    } else {
      res.render('verify', { title: 'Verify',token:token });
    }
});


router.post('/:token', function(req, res, next) {
    const token = req.params.token;
    console.log(req.body)
    if (
      req.body === undefined || 
      req.body.username === undefined || 
      req.body.password === undefined ||
      req.body.username === '' || 
      req.body.password === ''
    ){
      console.log("Bad authentication during email verification")
      res.render('verify', { title: 'Verify',token:token, error: "Un des champs n'a pas été rempli" });
    } else {
      console.log("Arguments are valid")
      usersDAO.connect(req.body.username,req.body.password)
      .then((success) => {
        console.log("Connexion succeed")
        // read verification file
        const filePath = '../emails_check/' + token
        fs.readFile(filePath, (err, data) => {
            if (err){
              console.error(err)
              res.render('verify', { title: 'Verify',token:token, error: "Token invalide" });
            }else {
              console.log("File read : " + data)
              if (success.mail !== data.toString()){
                console.log("Account invalid : " + typeof data.toString() + " " + typeof success.mail)
                res.render('verify', { title: 'Verify',token:token, error: "Le compte ne correspond pas à la bonne adresse e-mail" });
              } else {
                console.log("Everything ok, verifying account")
                usersDAO.verifyAccount(success.mail)
                .then(() => {
                  console.log("Email verified successfully : " + success.mail)
                  session.user = success;
                  console.log("Deleting verification file")
                  
                  fs.unlink(filePath, (err) => {
                    if (err){
                      console.log("Error when deleting file " + filePath + " " + err)
                    } else {
                      console.log("File " + filePath + " deleted successfully")
                    }

                  }); 
                  
                  res.redirect('/');
                })
                .catch((err) => {
                  console.log("Error when verifying email : " + success.mail)
                  res.render('verify', { title: 'Verify',token:token, error: "Erreur serveur lors de la vérification de l'adresse e-mail" });
                })
              }
            }
         })

        
      })
      .catch((err) => {
        console.log("Wrong credentials");
        res.render('verify', { title: 'Verify',token:token, error: "Mot de passe ou nom d'utilisateur incorrect" });

      })
    }
});

module.exports = router;
