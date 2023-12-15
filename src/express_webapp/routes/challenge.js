var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;

/* GET challenge details and download flag file. */
router.get('/:idChallenge', function(req, res, next) {
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
router.post('/:idChallenge', function(req, res, next) {
  const challengeId = req.params.idChallenge;
  const submittedFlag = req.body.flagInput;
  console.log("Submitted");
  challengesDAO.findByID(challengeId)
    .then(challengeDetails => {
      if (!challengeDetails) {
        return res.status(404).send('Challenge not found');
      }

      // Comparison
      if (submittedFlag === challengeDetails.flag) {
        // Success: pop-up badges todo
        console.log("success")
        res.render('challenge', { challenge: challengeDetails });
      } else {
        // Failure: pop-up todo
        console.log("failure")
        res.render('challenge', { challenge: challengeDetails });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;