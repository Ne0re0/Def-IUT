var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
var session = require('express-session');
const nodemailer = require('nodemailer');
const fs = require('node:fs');
const CryptoJS = require('crypto-js');
const yaml = require('js-yaml');
const readline = require('readline');
const CONF_VERIFY_PATH = "../../conf/verify.yml"
const LOG_FILE="../../log/defiut.log"
// Create a readline object to read file
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create the transporter using nodemailer library
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  auth: {
    user: 'noreply@defiut.fr', 
    pass: '679DC955B585DB021B569AC890725BD30DF8'
  },
  port : 2525
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (session.user !== undefined){
    res.redirect("/");
  } else {
    res.render('connect', { title: 'Connexion' });
  }
});


router.post('/', function(req, res, next) {
  if (req.body === undefined ||
      req.body.password === undefined ||
      req.body.username === undefined ||
      req.body.password === '' ||
      req.body.username === ''
  ){
    res.render('connect', { title: 'Connexion' });
  } else {
    console.log(req.body);
    usersDAO.connect(req.body.username, req.body.password)
      .then((connected) => {
        if (connected.accountVerified !== 1){

          // Create verification file
          const content = connected.mail;
          const title = CryptoJS.MD5(connected.mail + new Date().toString()).toString();

          try {
            fs.writeFileSync('../emails_check/' + title, content);
            // file written successfully
            console.log("Verification file written successfully");
          } catch (err) {
            console.error(err);
          }

          // Write mail
          var mailOptions = {
            from: 'contact.defiut@gmail.com',
            to: connected.mail,
            subject: 'Vérification de votre e-mail Def\'IUT',
            text: 'Vous pouvez vérifier votre compte en cliquant sur le lien suivant : http://localhost:3000/verify/' + title 
          };

          try {
            const confContent = fs.readFileSync(CONF_VERIFY_PATH, 'utf8');
            const conf = yaml.load(confContent);
            mailOptions.subject = conf.subject;
            var url = 'http://' + conf.domain + ':' + conf.port + '/verify/' + title
            mailOptions.text = conf.text.replace('#link',url);
            console.log(mailOptions);
          } catch (err){
            console.log(err);
            mailOptions.subject =  'Vérification de votre e-mail Def\'IUT',
            mailOptions.text = 'Vous pouvez vérifier votre compte en cliquant sur le lien suivant : http://localhost:3000/verify/' + title 
          }
          


          // Send mail
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Erreur lors de l'envoie de l\'e-mail")
              console.log(error)
              fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",SERVER ERROR : Email not sent to " + connected.mail );
              res.render('connect', { title: 'Connexion', failed: "Erreur lors de l'envoie du mail de vérification, veuillez vous reconnecter\n" });

            } else {
              console.log('Email envoyé :', info.response);

              fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",Verification email sent to '" + connected.mail +"'\n" );

              res.render('connect', { title: 'Connexion', failed: "Veuillez vérifier votre adresse mail, un e-mail vous a été envoyé\n" });
            }
          });
        } else {

          fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User '" + connected.mail + "' logged in\n" );
          console.log("User : " + connected.username + " logged in")
          session.user = connected;
          res.redirect("/");
        }

        
      })
      .catch((err) => {
        console.log(err)
        fs.appendFileSync(LOG_FILE, String(new Date())+","+req.connection.remoteAddress+",User '" + req.body.username + "' failed to authenticate\n" );

        res.render('connect', { title: 'Connexion', failed: err });
      });
  }
});

module.exports = router;
