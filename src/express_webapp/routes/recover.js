const express = require('express');
const router = express.Router();
const usersDAO = require('def-iut-database').usersDAO;
const nodemailer = require('nodemailer');
const fs = require('node:fs');
const CryptoJS = require('crypto-js');
var session = require('express-session');


// Create the transporter using nodemailer library
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  auth: {
    user: 'noreply@defiut.fr', 
    pass: '679DC955B585DB021B569AC890725BD30DF8'
  },
  port : 2525
});


router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('recover', { title: 'Mot de passe oublié' });
  }
});


router.get('/:token', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('newpassword', { title: 'Mot de passe oublié', token:req.params.token });
  }
});

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
    const title = CryptoJS.MD5(Math.random());

    try {
      fs.writeFileSync('../password_recovery/' + title, content);
      // file written successfully
      console.log("Recovery file written successfully");
    } catch (err) {
      console.error(err);
    }

    // Write mail
    const mailOptions = {
      from: 'contact.defiut@gmail.com',
      to: req.body.mail,
      subject: 'Réinitialisation du mot de passe',
      text: 'Vous pouvez réinitialiser votre mot de passe en cliquant sur le lien suivant : http://localhost:3000/recover/' + title 
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Erreur lors de l'envoie de l\'e-mail")
        console.log(error)
        res.render('recover', { title: 'Mot de passe oublié', error: "Erreur lors de l'envoie du mail de vérification, veuillez vous réessayer ultérieurement" });

      } else {
        console.log('Email envoyé :', info.response);
        res.render('recover', { title: 'Mot de passe oublié', error: "Veuillez vérifier votre adresse mail, un e-mail vous a été envoyé" });
      }
    })
  }
})

router.post('/:token', function(req, res, next) {

  if (session.user !== undefined){
    return res.redirect("/");
  } 

  console.log(req.body)
  console.log(req.params)
  var token = req.params.token;
  if(
    !req.body ||
    !req.body.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
    !req.body.password.match(".*\\d.*") ||
    !req.body.password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ||
    !req.body.password.length>7
  ){
    res.render('recover', { title: 'Mot de passe oublié', body:req.body, error:"Le mot de passe ne respecte pas les conditions générales de sécurité" });
  } else if (req.body.password !== req.body['password-confirmation']){
    res.render('recover', { title: 'Mot de passe oublié', body:req.body, error:"Le nouveau mot de passe et sa confirmation ne sont pas identiques" });
  } else {

    filePath = "../password_recovery/"+token
    fs.readFile(filePath, (err, data) => {
      if (err){
        console.error(err)
        res.render('recover', { title: 'Mot de passe oublié',token:token, error:"Token invalide" });
      } else {
        console.log("File read : " + data)
        console.log("File read : " + data.toString())
        console.log("File read : " + typeof data.toString())

        usersDAO.updatePassword(data.toString(),req.body.password)

        .then(() => {
          console.log("Password update succeed")
          res.render('recover', { title: 'Mot de passe oublié',token:token, success: "Mot de passe réinitialisé, vous pouvez vous connecter" });

          fs.unlink(filePath, (err) => {
            if (err){
              console.log("Error when deleting file " + filePath + " " + err)
            } else {
              console.log("File " + filePath + " deleted successfully")
            }
          }); 

        })
        .catch((err) => {
          console.log("Password update failed " + err)
          res.render('recover', { title: 'Mot de passe oublié',token:token, error: "Erreur lors de la modification du mot de passe" });
        })
      }
   })
  }
});

module.exports = router;