var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;


/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const challenges = await challengesDAO.findAll();
    console.log(challenges)
    // Limit the descriptions
    challenges.forEach(challenge => {
      challenge.truncatedDescription = truncateDescription(challenge.descriptionChallenge, 100); // Remplace 100 par la longueur maximale que tu veux afficher
    });

    res.render('index', { challenges });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
});


// Limit the length of description 
function truncateDescription(description, maxLength) {
  if (!description || description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength) + '...';
}

module.exports = router;