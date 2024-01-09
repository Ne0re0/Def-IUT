const fs = require('fs');
const yaml = require('js-yaml');
const readline = require('readline');

const challengesDAO = require('def-iut-database').challengesDAO;
const challengesFile = "../../conf/challenges.yml";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const successLog = (message) => {
  console.log("\x1b[32m%s\x1b[0m", message); // Green color for success
};

const errorLog = (message) => {
  errorLog("\x1b[31m%s\x1b[0m", message); // Red color for errors
};


console.log("Lecture du fichier conf/challenges.yml...")
try {
  // Read challenge file
  const challengesFileContent = fs.readFileSync(challengesFile, 'utf8');
  const challenges = yaml.load(challengesFileContent);
  console.log("Vérification de la syntaxe...")

  if (!challenges || !Array.isArray(challenges) || challenges.length === 0) {
    errorLog("Le fichier de défis est vide ou au mauvais format");
    process.exit(1); // Exiting the process due to invalid data
  }

  let syntaxError = false;

  // Step 1: Verify user input
  challenges.forEach((challenge, index) => {
    if (
      typeof challenge.title !== "string" ||
      typeof challenge.category !== "string" ||
      typeof challenge.difficulty !== "number" || 
      challenge.difficulty <= 0 || challenge.difficulty > 5 ||
      typeof challenge.description !== "string" ||
      typeof challenge.flag !== "string" || 
      (challenge.connection && typeof challenge.connection !== "string")
    ) {
      errorLog("Syntaxe invalide pour le challenge à l'index " + index);
      errorLog("Arrêt...");
      syntaxError = true;
    }
  });

  if (syntaxError) {
    process.exit(1); // Exiting the process due to syntax errors
  }

  successLog("Tous les formats sont valides");
  // Step 2: Verify that the challenges do not already exist
  console.log("Vérification de l'existence des challenges");

  // Function to process challenges
  const processChallenges = (index) => {
    if (index === challenges.length) {
      rl.close();
      return;
    }

    const challenge = challenges[index];

    challengesDAO.findByChallengeTitle(challenge.title)
      .then((success) => {
        // Challenges exists
        if (success !== undefined) {
          
          // Verify that update is necessary
          if (challenge.connection === undefined){
            challenge.connection = null;
          }
          if (success.titleChallenge === challenge.title &&
              success.descriptionChallenge === challenge.description &&
              success.itsCategory === challenge.category &&
              success.flag === challenge.flag &&
              success.itsDifficulty === challenge.difficulty &&
              success.connection === challenge.connection
            ) {
              successLog("La mise à jour de '"+challenge.title+"' n'est pas nécessaire")
              processChallenges(index + 1);
            } else {
              console.log("Une intervention de votre part est nécessaire pour "+challenge.title)
              console.log("Challenge courant : ")
              var display = {} 
              display.title = success.titleChallenge
              display.category = success.itsCategory
              display.difficulty = success.itsDifficulty
              display.description = success.descriptionChallenge
              display.flag = success.flag
              display.connection = success.connection;
              console.log(display)
              console.log("Mise à jour : ")
              console.log(challenge)

              rl.question("Voulez-vous mettre à jour le challenge courant ? (y/n) : ", (userInput) => {
                if (userInput === 'y') {
                  console.log("Mise a jour du challenge " + challenge.title);
                  challengesDAO.update(success.idChallenge, challenge.title, challenge.category, challenge.description, challenge.flag, challenge.difficulty, challenge.connection)
                    .then(() => {
                      successLog("Mise a jour du challenge réussie");
                      processChallenges(index + 1);
                    })
                    .catch((err) => {
                      errorLog("Erreur lors de la mise a jour du challenge " + challenge.title + " " + err);
                      processChallenges(index + 1);
                    });
                } else {
                  console.log("Challenge non modifié");
                  processChallenges(index + 1);
                }
              });
            }

        } else {
          console.log("Ajout du challenge : " + challenge.title);
          challengesDAO.insert(challenge.title, challenge.category, challenge.description, challenge.flag, challenge.difficulty, challenge.connection)
            .then((insertSuccess) => {
              successLog("Insertion réussie, identifiant : " + insertSuccess);
              processChallenges(index + 1);
            })
            .catch((err) => {
              errorLog("Erreur lors de l'insertion du challenge " + challenge.title + " " + err);
              processChallenges(index + 1);
            });
        }
      })
      .catch((err) => {
        errorLog("Une erreur est survenue lors de la récupération du challenge " + challenge.title + " " + err);
        processChallenges(index + 1);
      });
  };

  // Initiating processing of challenges
  processChallenges(0);

} catch (err) {
  errorLog('Erreur lors de la lecture du fichier:', err);
}
