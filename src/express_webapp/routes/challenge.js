var express = require('express');
var router = express.Router();
var challengesDAO = require('def-iut-database').challengesDAO;

/* GET challenge details and download flag file. */
router.get('/', function(req, res, next) {
  const challengeId = 1 ;//req.params.challengeId;
  challengesDAO.findByID(challengeId, function(challengeDetails) {
    if (!challengeDetails) {
      return res.status(404).send('Challenge not found');
    }

    // Render the challenge page with challenge details
    res.render('challenge', { challenge: challengeDetails });
  });
});

/* POST for flag verification. */
router.post('/', function(req, res, next) {
  const challengeId = req.params.challengeId;
  const submittedFlag = req.body.flagInput;

  challengesDAO.findByID(challengeId, function(challengeDetails) {
    if (!challengeDetails) {
      return res.status(404).send('Challenge not found');
    }

    // Comparison
    if (submittedFlag === challengeDetails.flag) {
      // Success: pop-up badges ?
      return res.render('/challengeId');
    } else {
      // Failure: pop-up ?
    }
  });
});

module.exports = router;
