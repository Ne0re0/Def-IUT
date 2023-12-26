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


  // Step 1 : Verify user input
  if (Array.isArray(challenges)) {
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
    	exit();
      }
    });
  } else {
    console.error("Les données attendues ne sont pas sous le bon format");
  }

  console.log("Tous les formats sont valides");
  // Step 2 : Verify that the challenges does not already exists
  console.log("Vérification de l'existence des challenges");
  challenges.forEach((challenge, index) => {
  	challengesDAO.findByChallengeTitle(challenge.title)
  	.then((success) => {
  		console.log(success)
  		if (success !== undefined){
  			console.log("'" + challenge.title + "' existe");
  			rl.question("Voulez vous l'écraser ? (y/n) : ", (userInput) => {
			  if (userInput === 'y'){
			  	console.log("Suppression du challenge " + challenge.title);
			  	challengesDAO.delete(success.idChallenge)
			  	.then((output) => {
			  		console.log("Challenge supprimé avec succès")
			  	})
			  	.catch((err) => {
			  		console.error("Erreur lors de la suppression du challenge : " + err)
			  	})
			  } else {
			  	console.log("Challenge non modifié")
			  }
			  rl.close();
			});
  		} else {
  			// EDIT HERE
  			challengesDAO.insert(titleChallenge,itsCategory,descriptionChallenge,flag,itsDifficulty,connection)
  		}

  	})
  	.catch((err) => {
  		console.log("Une erreur est survenue lors de la récupération du challenge "+ challenge.title)
  	})

  })


} catch (err) {
  console.error('Erreur lors de la lecture du fichier:', err);
}
