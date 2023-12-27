var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;
var hasTriedDAO = require('def-iut-database').hasTriedDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET challenge details and download flag file. */
router.get('/:idChallenge', isConnected, function(req, res, next) {
  const challengeId = req.params.idChallenge;
  challengesDAO.findByID(challengeId)
    .then(challengeDetails => {
      if (!challengeDetails) {
        return res.status(404).send('Challenge not found');
      }
      // Render the challenge page with challenge details
      res.render('challenge', { challenge: challengeDetails });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

/* POST for flag verification. */
router.post('/:idChallenge', isConnected, function(req, res, next) {

  const challengeId = req.params.idChallenge;
  const submittedFlag = req.body.flagInput;

  challengesDAO.findByID(challengeId)
    .then(challengeDetails => {
      if (!challengeDetails) {
        return res.status(404).send('Challenge not found');
      }

      // Comparison
      let success = "";
      if (submittedFlag === challengeDetails.flag) {
        success = "Bien joué! Vous avez réussi ce challenge!";
      }
      else {
        success = "Bien tenté! Mais ce n'est pas le bon flag!";
      }
      
      // Render the page with the flag validation result
      res.render('challenge', {
        challenge: challengeDetails, success,
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});


// Add a try
const addTry = async (userId, challengeId) => {
  try {
    const hasTriedEntry = await hasTriedDAO.findByID({ aUser: userId, aChallenge: challengeId });

    if (hasTriedEntry) {
      // Si l'utilisateur a déjà essayé ce challenge, mettez à jour le nombre d'essais
      const newRetryCount = hasTriedEntry.retryNb + 1;
      await hasTriedDAO.update({ aUser: userId, aChallenge: challengeId }, { retryNB: newRetryCount });
    } else {
      // Si c'est la première tentative, insérez une nouvelle entrée
      await hasTriedDAO.insert({ aUser: userId, aChallenge: challengeId, retryNB: 1 });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};


// Verif how much tries
const howMuchTries = async (userId, challengeId) => {
  try {
    const retryCount = await hasTriedDAO.getRetryCount(userId, challengeId);
    return retryCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};


module.exports = router;
