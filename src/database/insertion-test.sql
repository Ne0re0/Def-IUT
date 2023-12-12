-- Insert Users
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (2,'test1@univ-ubs.fr',1,'test1','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (3,'test2@univ-ubs.fr',1,'test2','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (4,'test3@univ-ubs.fr',1,'test3','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (5,'test4@univ-ubs.fr',1,'test4','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (6,'test5@univ-ubs.fr',1,'test5','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (7,'test6@univ-ubs.fr',0,'test6','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (8,'test7@univ-ubs.fr',0,'test7','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (9,'test8@univ-ubs.fr',0,'test8','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (10,'test9@univ-ubs.fr',0,'test9','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);


-- Insert Owns
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (2, 2, '2023-12-11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (2, 3, '2023-12-11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 3, '2023-12-11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 4, '2023-12-11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 5, '2023-12-11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 6, '2023-12-11');


-- Insert Challenges
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Premier challenge","Autre","Pour ce challenge, vous devrez entrer DEF{flag}","DEF{flag}","Débutant",10);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Deuxième challenge","Autre","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Débutant",20);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Troisième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Difficile",30);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Quatrième challenge","Reverse","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Difficile",40);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Cinquième challenge","Réseau","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Difficile",50);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Sixième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Difficile",60);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Septième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Moyen",70);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES ("Huitième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}","Difficile",80);

-- Insert HasTried
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,1,'2023-12-11',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,2,'2023-12-11',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,3,'2023-12-10',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,4,'2023-12-20',5);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,8,'2023-11-10',10);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,6,'2022-11-10',7);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (2,1,'2023-12-11',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, retryNb) VALUES (1,7,NULL,4);