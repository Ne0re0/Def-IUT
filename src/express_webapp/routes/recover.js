const express = require('express');
const router = express.Router();
const usersDAO = require('def-iut-database').usersDAO;
const nodemailer = require('nodemailer');
const fs = require('node:fs');
const CryptoJS = require('crypto-js');
var session = require('express-session');
const yaml = require('js-yaml');
const CONF_RECOVER_PATH = "../../conf/recover.yml"
const CONF_MAIL_PATH = "../../conf/mail.yml"
const LOG_FILE="../../log/defiut.log"

// Fonction de routage vers la vue recover.pug
router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('recover', { title: 'Mot de passe oublié' });
  }
});

// Fonction de routage vers la vue newpassword.pug
router.get('/:token', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('newpassword', { title: 'Mot de passe oublié', token:req.params.token });
  }
});


// Create and send mail function
router.post('/', function(req, res, next) {

  if (session.user !== undefined){
    return res.redirect("/");
  } 

  if (req.body === undefined || req.body.mail === undefined || req.body.mail === ''){
    res.render('recover', { title: 'Mot de passe oublié', error :"L'adresse e-mail n'a pas été précisée"});
  } else if (!req.body.mail.match(/^[A-Za-z0-9._%+-]+@.*univ-ubs\.fr$/)) {
    res.render('recover', { title: 'Mot de passe oublié', error :"L'adresse e-mail doit être une adresse UBS valide"});
  } else {
    // Write password recovery file
    const content = req.body.mail;

    // Create token
    let random = Math.random();
    const title = CryptoJS.MD5(random.toString());

    try {
      fs.writeFileSync('../password_recovery/' + title, content);
      // file written successfully
    } catch (err) {
      console.error(err);
    }


    // Write mail
    const mailOptions = {
      from: 'contact.defiut@gmail.com',
      to: req.body.mail,
      subject: 'Réinitialisation du mot de passe',
      text: ''
    };

    try {
        const confContent = fs.readFileSync(CONF_RECOVER_PATH, 'utf8');
        const conf = yaml.load(confContent);
        mailOptions.subject = conf.subject;
        var url = 'http://' + conf.domain + ':' + conf.port + '/recover/' + title
        mailOptions.text = conf.text.replace('#link',url);
    } catch (err){
        mailOptions.subject =  "Réinitialisation du mot de passe Déf'IUT"
        mailOptions.text = "Madame, Monsieur, \n\n Nous expérimentons actuellement une erreur du côté de nos serveurs, veuillez réessayer ultérieurement\n\nCybèrement vôtre\nLe staff Déf'IUT"
    }


    // Send mail
    try {

      const config = yaml.load(fs.readFileSync(CONF_MAIL_PATH, 'utf8'));

      const transporter = nodemailer.createTransport({
        host: config.smtpServer,
        port: config.smtpPort,
        auth: {
          user: config.login,
          pass: config.password
        }
      });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          let event = "SERVER ERROR while sending password recovery mail for '"+mailOptions.to +"' " + error + "\n"
          fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );

          res.render('recover', { title: 'Mot de passe oublié', error: "Erreur lors de l'envoi du mail de vérification, veuillez vous réessayer ultérieurement" });
        } else {
          let event ="Password recovery email successfully sent to user '" + mailOptions.to +"' " + "\n"
          fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );
      
          res.render('recover', { title: 'Mot de passe oublié', success: "Veuillez vérifier votre adresse mail, un e-mail vous a été envoyé" });
        }
      })

    } catch (err){
      console.log(err);
    }
    
  }
})


// Fonction de changement de mot de passe
router.post('/:token', function(req, res, next) {
  if (session.user !== undefined){
    return res.redirect("/");
  } 

  var token = req.params.token;
  if(
    !req.body ||
    !req.body.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
    !req.body.password.match(".*\\d.*") ||
    !req.body.password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ||
    !req.body.password.length>7
  ){
    res.render('newpassword', { title: 'Mot de passe oublié', body:req.body, token:token, error:"Le mot de passe ne respecte pas les conditions générales de sécurité" });
  } else if (req.body.password !== req.body['password-confirmation']){
    res.render('newpassword', { title: 'Mot de passe oublié', body:req.body, token:token, error:"Le nouveau mot de passe et sa confirmation ne sont pas identiques" });
  } else {

    filePath = "../password_recovery/"+token

    fs.readFile(filePath, (err, data) => {
      if (err){
        let event = "User failed to update his password (invalid token) '"+token + "'\n"
        fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );

        res.render('newpassword', { title: 'Mot de passe oublié',token:token, error:"Token invalide" });
      } else {
        // Case file has been read successfully
        fs.stat(filePath,(err,stats) => {
          if (err) {
            console.error(err);
          } else {
            const currentDate = new Date();
            const timer = Math.round((currentDate - stats.birthtime) / (1000 * 60));
            if (timer > 15){
              fs.unlink(filePath, (err) => {
                if (err){
                  console.log("Error when deleting file " + filePath + " " + err)
                } 
              }); 
              res.render('newpassword', { title: 'Mot de passe oublié',token:token, error: "Token expiré" });
              return;
            } else {

              usersDAO.updatePassword(data.toString(),req.body.password)
                .then(() => {
                  res.render('newpassword', { title: 'Mot de passe oublié',token:token, success: "Mot de passe réinitialisé, vous pouvez vous connecter" });

                  fs.unlink(filePath, (err) => {}); 

                  let event = "User '"+data.toString() +"' successfully updated his password" + "\n"
                  fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );

                })
                .catch((err) => {
                  let event = "SERVER ERROR while updating password for user '"+data.toString() +"' " + err +  "\n"
                  fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress + ","+event );

                  res.render('newpassword', { title: 'Mot de passe oublié',token:token, error: "Erreur lors de la modification du mot de passe" });
                })

            }
          }
        })
      }
   })
  }
});

module.exports = router;
