var express = require('express');
const session = require('express-session');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;
var hasTriedDAO = require('def-iut-database').hasTriedDAO;
const { isConnected } = require('./middlewares/isConnected'); // For connection state control

/* GET challenge details and download flag file. */
router.get('/:idChallenge', isConnected, function(req, res, next) {
  const challengeId = req.params.idChallenge;
  var successUsers = hasTriedDAO.getSuccessfulUsers(challengeId);
  console.log("getSuccessfulUsers = OK");
  challengesDAO.findByID(challengeId)
    .then(challengeDetails => {
      if (!challengeDetails) {
        return res.status(404).send('Challenge not found');
      }
      // Render the challenge page with challenge details
      console.log("Rendering...");
      console.log(session.user.idUser);
      res.render('challenge', { challenge: challengeDetails, successUsers});
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

/* POST for flag verification. */
router.post('/:idChallenge', isConnected, async function(req, res, next) {
  const challengeId = req.params.idChallenge;
  const submittedFlag = req.body.flagInput;
  const userId = session.user.idUser ;
  let success = "";

  console.log("Verif1");
  // Find challenge details
  var challengeDetails = await challengesDAO.findByID(challengeId);

  console.log("Verif2");
  // Find flaggers details
  var successUsers = hasTriedDAO.getSuccessfulUsers(challengeId);

  try {
    console.log("Verif3");
    // Check if the user has already succeeded in the challenge
    const alreadySucceeded = await alreadyFlagged(userId, challengeId);
    console.log("alreadySucceeded = " + alreadySucceeded);

    if (!alreadySucceeded) {
      if (!challengeDetails) {
        return res.status(404).send('Challenge not found');
      }
  
      // Comparison
      if (submittedFlag === challengeDetails.flag) {
        console.log("Flag = True");
        // If the submitted flag is correct, add a successful try
        const addedSuccessfulTry = await addSuccessfulTry(userId, challengeId);
  
        if (addedSuccessfulTry) {
          success = "Bien joué! Vous avez réussi ce challenge!";
        } else {
          success = "Vous avez déjà réussi ce challenge!";
        }
      } else {
        console.log("Flag = False");
        // If the submitted flag is incorrect, add a regular try
        await addTry(userId, challengeId);
        success = "Bien tenté! Mais ce n'est pas le bon flag!";
      }
    }
    else {
      console.log("Flag = Already Flagged");
      // If the user has already succeeded, redirect to the challenge page with a message
      success = "Vous avez déjà réussi ce challenge!";
    }
    
    // Render the page with the flag validation result
    res.render('challenge', { challenge: challengeDetails, success, successUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Check the challenge's validation
const alreadyFlagged = async (userId, challengeId) => {
  try {
    const flaggedEntry = await hasTriedDAO.isFlagged(userId, challengeId );
    console.log("flaggedEntry = " + flaggedEntry);
    if (flaggedEntry === 0) {
      return false;
    }
    else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};


// Add a try
const addTry = async (userId, challengeId) => {
  try {
    const nbRetry = await howMuchTries(userId, challengeId);
    console.log("nbRetry = " + nbRetry);

    if (nbRetry > 0) {
      // Si l'utilisateur a déjà essayé ce challenge, mettez à jour le nombre d'essais
      const newRetryCount = nbRetry + 1;
      await hasTriedDAO.update(userId, challengeId, null, newRetryCount);
    } else {
      // Si c'est la première tentative, insérez une nouvelle entrée
      await hasTriedDAO.insert(userId, challengeId, null, 1);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Valid the challenge
const addSuccessfulTry = async (userId, challengeId) => {
  try {
    var date = new Date();
    dateStr = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) +  "-" + date.getFullYear(); // Date format : jj-mm-yyyy

    const nbTry = howMuchTries(userId, challengeId);
    if (nbTry !== 0) {
      await hasTriedDAO.update(userId, challengeId, dateStr, nbTry + 1);
      return true;
    } else {
      // Si c'est la première réussite, insérez une nouvelle entrée avec le drapeau réussi
      await hasTriedDAO.insert(userId, challengeId, dateStr, 1);
      return true;
    }
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
