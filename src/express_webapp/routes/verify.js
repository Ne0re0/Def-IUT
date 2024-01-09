var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');
const fs = require('fs');
const LOG_FILE="../../log/defiut.log"

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
      fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User failed to verify his account with token :'" + token + "' (empty fields)\n" );
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
              fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User failed to verify his account with token :'" + token + "' and email : " + success.mail + " (invalid token)\n" );

              res.render('verify', { title: 'Verify',token:token, error: "Token invalide" });
            }else {
              console.log("File read : " + data)
              if (success.mail !== data.toString()){

                let event = "User tried to verify an account :'"+ data + " with another account : " + success.mail + "'\n"
                fs.appendFileSync(LOG_FILE, String(new Date())+","+ req.connection.remoteAddress + ","+event );
                
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

                  let event = "User "+req.body.username +"' verified his account success'\n"
                  fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
                  
                  
                  res.redirect('/');
                })
                .catch((err) => {
                  console.log("Error when verifying email : " + success.mail)
                  let event = "SERVER ERROR during database update for mail verification for '" + success.mail + "'\n"
                  fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
                  res.render('verify', { title: 'Verify',token:token, error: "Erreur serveur lors de la vérification de l'adresse e-mail" });
                })
              }
            }
         })

        
      })
      .catch((err) => {
        console.log("Wrong credentials");
        let event = "User "+req.body.username +"' failed to verify his account with wrong credentials '" + token + "'\n"
        fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
                  
        res.render('verify', { title: 'Verify',token:token, error: "Mot de passe ou nom d'utilisateur incorrect" });

      })
    }
});

module.exports = router;
