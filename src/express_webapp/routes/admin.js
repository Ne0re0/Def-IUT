var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;

/* GET home page. */
router.get('/', function(req, res, next) {
  // Verification de la session 
  //console.log("Session admin " +session.user.isAdmin); 
  //if (session.user.isAdmin == 1){
    console.log("Avant find all utilisateurs");
    usersDAO.findAll()
    .then(users => {
        console.log('Liste des utilisateurs :', users);
        res.render('admin', { title: 'Admin Panel', users: users });
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        res.render('error', { title: 'Erreur lors de la récupération des utilisateurs' });
    });
  //}else{
  //  res.render('error', { title: 'Vous n avez pas de session' });
  //}
  
  
});
router.post('/', function(req, res, next) {
  if (req.body.action == 'update') {
    // Récupérer les valeurs du formulaire pour la modification
    const userId = req.body.userId; // Récupérer l'ID de l'utilisateur à modifier
    // Récupérer des champs du formulaire

    const updatedData = {
      mail: req.body.userMail,
      accountVerified: req.body.userVerified,
      username: req.body.userName,
      isAdmin: req.body.userIsAdmin
    };

    usersDAO.findByID(userId)
    .then(user => {
      updatedData.password = user.password;
      return usersDAO.update(userId, updatedData); // Retourner la promesse de mise à jour
    })
    .then(() => {
      usersDAO.findAll()
          .then(users => {
              res.render('admin', { title: 'Admin Panel', users: users });
          })
          .catch(err => {
              console.error('Erreur lors de la récupération des utilisateurs :', err);
              res.render('error', { title: 'Erreur lors de la récupération des utilisateurs' }); // Rediriger vers la page  après la mise à jour
          });
    })
    .catch(err => {
      console.error('Erreur lors de la mise à jour ou redirection :', err);
      res.render('error', { title: 'Erreur lors de la mise à jour ou redirection' });
    });
  } else if (req.body.action == 'delete') {
    const userId = req.body.userId;

    usersDAO.delete(userId)
    .then(() => {
      console.log('Utilisateur supprimé');
      return usersDAO.findAll();
    })
    .then(users => {
      res.render('admin', { title: 'Admin Panel', users: users });
    })
    .catch(err => {
      console.error('Erreur lors de la suppression :', err);
      res.render('error', { title: 'Erreur lors de la suppression' });
    });
  } else {
    res.render('error', { title: 'Post sans cliquer sur un bouton' });
  }
});




module.exports = router;
