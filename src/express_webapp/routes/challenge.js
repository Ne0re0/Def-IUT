const express = require('express');
const session = require('express-session');
const router = express.Router();
const challengesDAO = require('def-iut-database').challengesDAO;
const hasTriedDAO = require('def-iut-database').hasTriedDAO;
const { isConnected } = require('./middlewares/isConnected'); 
// For connection state control

/* GET challenge details and download flag file. */
router.get('/:idChallenge', isConnected, async function(req, res, next) {
  try {
    const challengeId = req.params.idChallenge;
    const successUsers = await hasTriedDAO.getSuccessfulUsers(challengeId);
    const retryCount = await hasTriedDAO.getRetryCount(session.user.idUser, challengeId);
    const isFlagged = await hasTriedDAO.getFlagDate(session.user.idUser, challengeId);
    console.log(isFlagged);
    console.log("getSuccessfulUsers = OK");
    console.log(successUsers);

    const challengeDetails = await challengesDAO.findByID(challengeId);
    if (!challengeDetails) {
      return res.render('error');
    }
    console.log(challengeDetails)

    console.log("Rendering...");
    console.log(session.user.idUser);
    res.render('challenge', { challenge: challengeDetails, successUsers, retryCount, isFlagged });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* POST for flag verification. */
router.post('/:idChallenge', isConnected, async function(req, res, next) {
  const challengeId = req.params.idChallenge;
  const submittedFlag = req.body.flagInput;
  const userId = session.user.idUser;
  let success = "";


  try {
    const challengeDetails = await challengesDAO.findByID(challengeId);
    if (!challengeDetails) {
      return res.render('error');
    }

    const successUsers = await hasTriedDAO.getSuccessfulUsers(challengeId);
    const retryCount = await hasTriedDAO.getRetryCount(session.user.idUser, challengeId);

    console.log(successUsers);

    const isFlagged = await alreadyFlagged(userId, challengeId);
    if (!isFlagged) {
      if (submittedFlag === challengeDetails.flag) {
        console.log("Flag = True");
        await addSuccessfulTry(userId, challengeId);
        success = "Bien joué! Vous avez réussi ce challenge !";
      } else {
        console.log("Flag = False");
        await addTry(userId, challengeId);
        success = "Bien tenté! Mais ce n'est pas le bon flag !";
      }
    } else {
      console.log("Flag = Already Flagged");
      success = "Vous avez déjà réussi ce challenge !";
    }

    res.render('challenge', { challenge: challengeDetails, success, successUsers, retryCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Check the challenge's validation
const alreadyFlagged = async (userId, challengeId) => {
  try {
    const flaggedEntry = await hasTriedDAO.isFlagged(userId, challengeId);
    if (flaggedEntry === 0) {
      return false;
    }
    if (flaggedEntry === 1) {
      return true;
    }
    throw new Error("Multiple row retrieved " + flaggedEntry);
  } catch (err) {
    return false;
  }
};

// Add a try
const addTry = async (userId, challengeId) => {
  try {
    const nbRetry = await howMuchTries(userId, challengeId);
    console.log("nbRetry = " + nbRetry);

    if (nbRetry > 0) {
      const newRetryCount = nbRetry + 1;
      await hasTriedDAO.update(userId, challengeId, null, newRetryCount);
      console.log("Try added OK");
    } else {
      await hasTriedDAO.insert(userId, challengeId, null, 1);
      console.log("Try added OK");
    }
  } catch (err) {
    console.error(err);
    throw new Error('Internal Server Error');
  }
};

// Valid the challenge
const addSuccessfulTry = async (userId, challengeId) => {
    let months = ["jan.","fév.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]

    const today = new Date();
    const year = today.getFullYear();
    const month = months[today.getMonth()];
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');

    const dateStr = `${hour}h${minute} ${day} ${month} ${year}`;
    console.log(dateStr)
    howMuchTries(userId, challengeId)
      .then((nbTry) => {
        if (nbTry !== 0) {
          hasTriedDAO.update(userId, challengeId, dateStr, nbTry + 1)
            .then(() => {
              console.log("Update succeed")
            })
            .catch((err) => {
              console.log("Update failed")
            })
        } else {
          hasTriedDAO.insert(userId, challengeId, dateStr, 1)
            .then(() => {
              console.log("Update succeed")
            })
            .catch((err) => {
              console.log("Update failed")
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
    .catch((err) => {
      console.log(err);
    })
};

// Verif how much tries
const howMuchTries = async (userId, challengeId) => {
  try {
    const retryCount = await hasTriedDAO.getRetryCount(userId, challengeId);
    return retryCount;
  } catch (err) {
    console.error(err);
    throw new Error('Internal Server Error');
  } 
};

module.exports = router;
