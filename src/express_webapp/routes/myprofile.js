var express = require('express');
const session = require('express-session');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET home page. */
router.get('/', isConnected, function(req, res, next) {
  
  if (!session || session.user === undefined) {
    res.redirect("/connect");
  } else {
  console.log("User session",session.user);
    res.render('myprofile', { title: 'My Profile', user: session.user })
  };
});


router.post('/', isConnected, function(req, res, next) {
  console.log("first", req.body);
  if (
    req.body.newUsername === undefined ||
    req.body.newUsername === '' || 
    req.body.newEmail === undefined ||
    req.body.newEmail === ''  
  ){
    res.render('myprofile', { title: 'My Profile', body:req.body, error:"Au moins un champ n'a pas été rempli", user: session.user });
    return;
  }
  
  if (!req.body.newEmail.match(/^[A-Za-z0-9._%+-]+@.*univ-ubs\.fr$/)){
    res.render('myprofile', { title: 'My Profile', body:req.body, error:"Format de l'adresse e-mail invalide", user: session.user });
    return;
  }

  usersDAO.findByID(session.user.idUser)
    .then(user => {
      console.log("Entré dans find");
      var userId = user.idUser;
      user.username = req.body.newUsername;
      if(req.body.newEmail !== user.mail) {
        user.isVerified = 0;
      }
      user.mail = req.body.newEmail;
      // Supprimer l'attribut idUser de l'objet user avant la mise à jour
      delete user.idUser;

      // Mettre à jour l'utilisateur
      console.log(user)
      usersDAO.update(userId, Object.values(user))
        .then((utilisateur) => {
          console.log("Profil mis à jour avec succès");
          usersDAO.findByID(userId)
          .then((user) => {
            session.user = user;
            res.render('myprofile', { title: 'My Profile', body:req.body, success:"Profil mis à jour avec succès", user: session.user });
          })
          .catch((err) => {
            res.render('myprofile', { title: 'My Profile', body:req.body, error:"Profile mis à jour avec succès, utilisateur non retrouvé", user: session.user });
          })
        })
        .catch(err => {
          console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
          res.render('myprofile', { title: 'My Profile', body:req.body, error:"Erreur lors de la mise à jour du profil", user: session.user });
        });
    })
    .catch(err => {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      res.render('myprofile', { title: 'My Profile', body:req.body, error:"Erreur lors de la recherche de l'utilisateur", user: session.user });
    });
});

module.exports = router;
