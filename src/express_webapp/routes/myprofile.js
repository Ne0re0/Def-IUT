var express = require('express');
const session = require('express-session');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;

/* GET home page. */
router.get('/', function(req, res, next) {
  /*
  if (!session || session.user === undefined) {
    console.log("tata");
    res.render('error', { title: 'Erreur', message: 'Vous ne pouvez pas accéder à la page profil sans être authentifié', error: { status: 500, stack: 'Vous ne pouvez pas accéder à la page profil sans être authentifié' } });
  } else {*/
  console.log("User session",session.user);
    console.log("toto");
    res.render('myprofile', { title: 'My Profile', user: session.user });
  //}
});


router.post('/', function(req, res, next) {
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

      // Vérification si les champs de mot de passe sont remplis
      if (
        req.body.oldPassword !== undefined && req.body.oldPassword !== '' &&
        req.body.newPassword !== undefined && req.body.newPassword !== '' &&
        req.body.confirmNewPassword !== undefined && req.body.confirmNewPassword !== ''
      ) {
        if (
          !req.body.newPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ||
          !req.body.newPassword.match(".*\\d.*") ||
          !req.body.newPassword.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ||
          req.body.newPassword.length <= 7 ||
          req.body.newPassword !== req.body.confirmNewPassword
        ){
          res.render('myprofile', { title: 'My Profile', body:req.body, error:"Le mot de passe ne respecte pas les conditions ou ne correspond pas à la confirmation", user: session.user });
          return;
        }
        
        // Si les conditions de mot de passe sont respectées
        user.password = req.body.newPassword;
      }

      // Supprimer l'attribut idUser de l'objet user avant la mise à jour
      delete user.idUser;

      // Mettre à jour l'utilisateur
      usersDAO.update(userId, Object.values(user))
        .then((utilisateur) => {
          console.log("Profil mis à jour avec succès");
          session.user = utilisateur;
          res.render('myprofile', { title: 'My Profile', body:req.body, success:"Profil mis à jour avec succès", user: session.user });
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
