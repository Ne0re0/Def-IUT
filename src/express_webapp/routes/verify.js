var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');
const fs = require('fs');
const { exit } = require('process');
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
    if (
      req.body === undefined || 
      req.body.username === undefined || 
      req.body.password === undefined ||
      req.body.username === '' || 
      req.body.password === ''
    ){
      fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User failed to verify his account with token :'" + token + "' (empty fields)\n" );
      res.render('verify', { title: 'Verify',token:token, error: "Un des champs n'a pas été rempli" });
    } else {
      usersDAO.connect(req.body.username,req.body.password)
      .then((success) => {
        // read verification file
        const filePath = '../emails_check/' + token
        fs.readFile(filePath, (err, data) => {
            if (err){
              fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User failed to verify his account with token :'" + token + "' and email : " + success.mail + " (invalid token)\n" );
              res.render('verify', { title: 'Verify',token:token, error: "Token invalide" });
            } else {
              if (success.mail !== data.toString()){

                let event = "User tried to verify an account :'"+ data + " with another account : " + success.mail + "'\n"
                fs.appendFileSync(LOG_FILE, String(new Date())+","+ req.connection.remoteAddress + ","+event );
                
                res.render('verify', { title: 'Verify',token:token, error: "Le compte ne correspond pas à la bonne adresse e-mail" });
              } else {
                // Retrieve creation date to denote if the time is valid (15min)
                fs.stat(filePath,(err, stats) => {
                  if (err) {
                    console.error(err);
                    return;
                  } else {
                    const currentDate = new Date();

                    const timer = Math.round((currentDate - stats.birthtime) / (1000 * 60));
                    if (timer > 15){
                      fs.unlink(filePath, (err) => {
                        if (err){
                          console.log("Error when deleting file " + filePath + " " + err)
                        } 
                      }); 
                      res.render('verify', { title: 'Verify',token:token, error: "Token expiré" });
                      return;
                    } else {

                      usersDAO.verifyAccount(success.mail)
                      .then(() => {
                        session.user = success;
                        
                        fs.unlink(filePath, (err) => {
                          if (err){
                            console.log("Error when deleting file " + filePath + " " + err)
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
