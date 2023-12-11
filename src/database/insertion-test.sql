-- Insert Owns
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 2, '2023-12-11');

-- Insert Challenges
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Premier challenge","Autre","Pour ce challenge, vous devrez entrer DEF{flag}","DEF{flag}","Débutant",50);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Premier challenge","Autre","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Débutant",50);

-- Insert HasTried
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,1,'2023-12-11',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,2,NULL,4);