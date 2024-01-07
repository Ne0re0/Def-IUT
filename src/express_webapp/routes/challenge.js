const express = require('express');
const session = require('express-session');
const router = express.Router();
const challengesDAO = require('def-iut-database').challengesDAO;
const hasTriedDAO = require('def-iut-database').hasTriedDAO;
const ownsDAO = require('def-iut-database').ownsDAO;
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

    const retryCount = await hasTriedDAO.getRetryCount(userId, challengeId);

    const isFlagged = await alreadyFlagged(userId, challengeId);
    if (!isFlagged) {
      if (submittedFlag === challengeDetails.flag) {
        console.log("Flag = True");
        await addSuccessfulTry(userId, challengeId);
        success = "Bien joué! Vous avez réussi ce challenge !";

        // Badges attribution
        await WelcomeBadge(userId);
        await FirstTryBadge(userId, challengeId);
        await FirstBloodBadge(userId, challengeId);
        await HappyHourBadge(userId);
        await PerseverantBadge(userId, challengeId);
        await ExplorerBadge(userId);
        await CompletionistBadge(userId);
        await HackermanBadge(userId);

      } else {
        console.log("Flag = False");
        await addTry(userId, challengeId);
        success = "Bien tenté! Mais ce n'est pas le bon flag !";
      }
    } else {
      console.log("Flag = Already Flagged");
      success = "Vous avez déjà réussi ce challenge !";
    }

    const successUsers = await hasTriedDAO.getSuccessfulUsers(challengeId);

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
    await howMuchTries(userId, challengeId)
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


/** 
 * Badges attribution functions
 * 
 * Dans ces fonctions, on considère que le succès de l'utilisateur pour un challenge 
 * a déjà été inséré dans la bdd.
 */ 

// Get the Date
function getTheDate() {
  const date = new Date();
  return date.getFullYear() + "-" + parseInt(date.getMonth())+1 + "-" + date.getDate();
}

// Bienvenue
async function WelcomeBadge(userId) {
  const id = 1;
  try {
      // Vérifier si l'utilisateur a déjà obtenu le badge "Bienvenue"
      const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

      if (!alreadyObtained) {
        // Accorder le badge "Bienvenue" à l'utilisateur
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Bienvenue" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }

      return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
      console.error('Erreur lors de la vérification du badge "Bienvenue":', error);
  }
}

// First Try
async function FirstTryBadge(userId, challengeId) {
  const id = 2;
  try {
      // Vérifier si l'utilisateur a déjà obtenu le badge "First try"
      const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

      if (!alreadyObtained) {
          // Vérifier si l'utilisateur a un seul essai pour le défi actuel
          const numberOfTries = await howMuchTries(userId, challengeId);
          console.log("numberOfTries = " + numberOfTries);
          if (numberOfTries === 1) {
            // Accorder le badge "First try" à l'utilisateur
            await ownsDAO.insert([userId, id, getTheDate()]);
            console.log(`Badge "First try" accordé à l'utilisateur avec l'ID ${userId}.`);
            return true; // Indique que le badge a été accordé
          }
      }

      return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
      console.error('Erreur lors de la vérification du badge "First try":', error);
  }
}

// First Blood
async function FirstBloodBadge(userId, challengeId) {
  const id = 3;
  try {
      // Vérifier si l'utilisateur a déjà obtenu le badge "First blood"
      const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

      if (!alreadyObtained) {
          // Vérifier si l'utilisateur est le premier à réussir le défi
          const successfulUsers = await hasTriedDAO.getSuccessfulUsers(challengeId);

          if (successfulUsers.length === 1 && successfulUsers[0].idUser === userId) {
            // Accorder le badge "First blood" à l'utilisateur
            await ownsDAO.insert([userId, id, getTheDate()]);
            console.log(`Badge "First blood" accordé à l'utilisateur avec l'ID ${userId}.`);
            return true; // Indique que le badge a été accordé
          }
      }

      return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
      console.error('Erreur lors de la vérification du badge "First blood":', error);
  }
}

// Happy Hour
async function HappyHourBadge(userId) {
  const id = 4;
  try {
    // Vérifier si l'utilisateur a déjà obtenu le badge "Happy hour"
    const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

    if (!alreadyObtained) {
      // Vérifier si nous sommes en happy hour
      const isValidHappyHour = await isHappyHour();

      if (isValidHappyHour) {
        // Accorder le badge "Happy hour" à l'utilisateur
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Happy hour" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }
    }

    return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
    console.error('Erreur lors de la vérification du badge "Happy hour":', error);
  }
}

// Fonction pour définir l'happy hour
async function isHappyHour() {
  return true;
  try {
    const date = new Date();
    
    // Vérifier si le jour est un jeudi
    const isThursday = date.getDay() === 4;

    // Vérifier si l'heure est entre 17 et 19 heures
    const isHappyHourTime = date.getHours() >= 17 && date.getHours() < 19;

    return isThursday && isHappyHourTime;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'heure "Happy hour":', error);
  }
}

// Persévérant
async function PerseverantBadge(userId, challengeId) {
  const id = 5;
  const requiredAttempts = 0;

  try {
    // Vérifier si l'utilisateur a déjà obtenu le badge "Persévérant"
    const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

    if (!alreadyObtained) {
      // Vérifier le nombre de tentatives erronées pour le défi actuel
      const numberOfTries = await howMuchTries(userId, challengeId);

      if (numberOfTries >= requiredAttempts + 1) {
        // Accorder le badge "Persévérant" à l'utilisateur
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Persévérant" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }
    }

    return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
    console.error('Erreur lors de la vérification du badge "Persévérant":', error);
  }
}

// Explorer
async function ExplorerBadge(userId) {
  const id = 6;

  try {
    // Vérifier si l'utilisateur a déjà obtenu le badge "Explorateur"
    const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

    if (!alreadyObtained) {
      // Vérifier si l'utilisateur a validé au moins un défi dans chaque catégorie
      const nbsuccessedCategory = await challengesDAO.successedCategory(userId);
      const nbCategories = await challengesDAO.countCategories();

      console.log("nbsuccessedCategory = " + nbsuccessedCategory.categoryCount);
      console.log("nbCategories = " + nbCategories);

      if (nbsuccessedCategory.categoryCount === nbCategories) {
        // Accorder le badge "Explorateur" à l'utilisateur
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Explorateur" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }
    }

    return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
    console.error('Erreur lors de la vérification du badge "Explorateur":', error);
  }
}

// Complétionniste
async function CompletionistBadge(userId) {
  const id = 7;

  try {
    // Vérifier si l'utilisateur a déjà obtenu le badge "Complétionniste"
    const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

    if (!alreadyObtained) {
      // Vérifier si l'utilisateur a validé tous les défis de la plateforme
      const allChallenges = await challengesDAO.findAll();

      // Vérifier pour chaque défi
      var hasValidatedAllChallenges = true;
      for (var chall of allChallenges) {
        var result = await alreadyFlagged(userId, chall.idChallenge);
        if (!result) {
            hasValidatedAllChallenges = false;
        }
      }

      // Si tous les défis ont été validés, accorder le badge "Complétionniste"
      if (hasValidatedAllChallenges) {
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Complétionniste" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }
    }

    return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
    console.error('Erreur lors de la vérification du badge "Complétionniste":', error);
  }
}

// Hackerman
async function HackermanBadge(userId) {
  const id = 8;

  try {
    // Vérifier si l'utilisateur a déjà obtenu le badge "Hackerman"
    const alreadyObtained = await ownsDAO.alreadyObtained(userId, id);

    if (!alreadyObtained) {
      // Obtenir les badges non acquis par l'utilisateur
      const notOwnedBadges = await ownsDAO.getNotOwnedBadges(userId);

      // Vérifier si l'utilisateur a obtenu tous les badges
      if (notOwnedBadges.length === 1) {
        // Si tous les badges ont été obtenus, accorder le badge "Hackerman"
        await ownsDAO.insert([userId, id, getTheDate()]);
        console.log(`Badge "Hackerman" accordé à l'utilisateur avec l'ID ${userId}.`);
        return true; // Indique que le badge a été accordé
      }
    }

    return false; // Indique que le badge n'a pas été accordé
  } catch (error) {
    console.error('Erreur lors de la vérification du badge "Hackerman":', error);
  }
}

module.exports = router;