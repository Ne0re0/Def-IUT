const fs = require('fs');
const yaml = require('js-yaml');
const readline = require('readline');

const challengesDAO = require('def-iut-database').challengesDAO;
const challengesFile = "../../conf/challenges.yml";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Lecture du fichier conf/challenges.yml...")
try {
  // Read challenge file
  const challengesFileContent = fs.readFileSync(challengesFile, 'utf8');
  const challenges = yaml.load(challengesFileContent);
  console.log("Vérification de la syntaxe...")

  if (!challenges || !Array.isArray(challenges) || challenges.length === 0) {
    console.error("Le fichier de défis est vide ou au mauvais format");
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
      console.error("Syntaxe invalide pour le challenge à l'index " + index);
      console.error("Arrêt...");
      syntaxError = true;
    }
  });

  if (syntaxError) {
    process.exit(1); // Exiting the process due to syntax errors
  }

  console.log("Tous les formats sont valides");
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
          console.log("'" + challenge.title + "' existe");

          
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
              console.log("La mise à jour n'est pas nécessaire")
              processChallenges(index + 1);
            } else {
              console.log("Challenge courant : ")
              console.log(success)
              console.log("Nouveau challenge : ")
              console.log(challenge)

              rl.question("Voulez vous mettre a jour le challenge courant ? (y/n) : ", (userInput) => {
                if (userInput === 'y') {
                  console.log("Mise a jour du challenge " + challenge.title);
                  challengesDAO.update(success.idChallenge, challenge.title, challenge.category, challenge.description, challenge.flag, challenge.difficulty, challenge.connection)
                    .then(() => {
                      console.log("Mise a jour du challenge réussie");
                      processChallenges(index + 1);
                    })
                    .catch((err) => {
                      console.error("Erreur lors de la mise a jour du challenge " + challenge.title + " " + err);
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
              console.log("Insertion réussie, identifiant : " + insertSuccess);
              processChallenges(index + 1);
            })
            .catch((err) => {
              console.error("Erreur lors de l'insertion du challenge " + challenge.title + " " + err);
              processChallenges(index + 1);
            });
        }
      })
      .catch((err) => {
        console.error("Une erreur est survenue lors de la récupération du challenge " + challenge.title + " " + err);
        processChallenges(index + 1);
      });
  };

  // Initiating processing of challenges
  processChallenges(0);

} catch (err) {
  console.error('Erreur lors de la lecture du fichier:', err);
}
