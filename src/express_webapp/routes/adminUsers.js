var express = require('express');
var router = express.Router();
var usersDAO = require('def-iut-database').usersDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET home page. */
router.get('/', isConnected, function(req, res, next) {
  // Verification de la session 
  //console.log("Session admin " +session.user.isAdmin); 
  if (session.user.isAdmin == 1){
    console.log("Avant find all utilisateurs");
    usersDAO.findAll()
    .then(users => {
        console.log('Liste des utilisateurs :', users);
        res.render('adminUsers', { title: 'Admin Panel', users: users });
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        res.render('error', { title: 'Error',message:"Erreur lors de la récupération des utilisateurs ", error:{status : 500, stack : "Erreur lors de la récupération des utilisateurs"} });
    });
  }else{
    res.render('error', { title: 'error',message:'Erreur vous n êtes pas administrateur', error: { status: 500, stack: 'Erreur vous n êtes pas administrateur' } });
  }
  
  
});
router.post('/', isConnected, function(req, res, next) {
  if (req.body.action == 'update') {
    // Récupérer les valeurs du formulaire pour la modification
    const userId = req.body.userId; // Récupérer l'ID de l'utilisateur à modifier
    // Récupérer des champs du formulaire
    console.log(userId);
    if (
      (req.body.userMail && req.body.userMail != "")  &&
      (req.body.userVerified && req.body.userVerified != "" && !isNan(req.body.userVerified))   &&
      (req.body.userName && req.body.userName!= "") &&
      (req.body.userIsAdmin && req.body.userIsAdmin != "" && !isNan(req.body.userIsAdmin))
    ) {
      const updatedData = {
        mail: req.body.userMail.text(),
        accountVerified: req.body.userVerified,
        username: req.body.userName,
      };
      console.log(updatedData);

      // Récupérer les données de l'utilisateur à partir de l'ID
      usersDAO.findByID(userId)
        .then(user => {
          // Ajouter le mot de passe de l'utilisateur aux données mises à jour
          updatedData.password = user.password;
          // Ajouter isAdmin aux données mises à jour
          updatedData.isAdmin = req.body.userIsAdmin;

          // Mettre à jour l'utilisateur avec les données mises à jour
          return usersDAO.update(userId, Object.values(updatedData)); // Retourner la promesse de mise à jour
        })
        .then(() => {
          // Récupérer tous les utilisateurs après la mise à jour
          usersDAO.findAll()
            .then(users => {
              // Rendre la vue admin avec la liste mise à jour des utilisateurs
              res.render('admin', { title: 'Admin Panel', users: users });
            })
            .catch(err => {
              console.error('Erreur lors de la récupération des utilisateurs :', err);
              res.render('error', { title: 'Error' , message:'Erreur lors de la récupération des utilisateurs', error: { status: 500, stack: 'Erreur lors de la récupération des utilisateurs' } });
            });
        })
        .catch(err => {
          console.error('Erreur lors de la mise à jour ou redirection :', err);
          res.render('error', { title: 'Error', message: 'Erreur lors de la mise à jour ou redirection',error: { status: 500, stack: 'Erreur lors de la mise à jour ou redirection' }  });
        });
    }else{
      res.render('error', { title: 'Error' , message: 'Certains éléments du formulaire sont vides', error: { status: 500, stack: 'Certains éléments du formulaire sont vides' } } );
    }
  } else if (req.body.action == 'delete') {
    const userId = req.body.userId;
    console.log(req.body.userId);

    usersDAO.delete(userId)
    .then(() => {
      console.log('Utilisateur supprimé');
      return usersDAO.findAll();
    })
    .then(users => {
      res.render('adminUsers', { title: 'Admin Panel', users: users });
    })
    .catch(err => {
      console.error('Erreur lors de la suppression :', err);
      res.render('error', { title: 'Error', message: 'Erreur lors de la suppression', error: { status: 500, stack: 'Erreur lors de la suppression'} });
    });
  } else {
    res.render('error', { title: 'Error' , message: 'Post sans cliquer sur un bouton', error: { status: 500, stack: 'Post sans cliquer sur un bouton' } } );
  }
});




module.exports = router;
