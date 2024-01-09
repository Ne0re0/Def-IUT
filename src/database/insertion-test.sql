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
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Premier challenge","Autre","Pour ce challenge, vous devrez entrer DEF{flag}","DEF{flag}",1, "http://google.com");
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Deuxième challenge","Autre","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",2,NULL);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Troisième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",3,"ssh john@defiut.fr");
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Quatrième challenge","Reverse","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",4,NULL);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Cinquième challenge","Réseau","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",5,NULL);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Sixième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",1,NULL);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Septième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",2,NULL);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES ("Huitième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",4,NULL);

-- Insert HasTried
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,1,'2024/01/08','18:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,2,'2023/11/18','10:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,3,'2023/12/30','18:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,4,'2024/01/14','18:01',5);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,8,'2024/01/30','11:01',10);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,6,'2024/01/01','14:01',7);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (2,1,'2024/01/20','10:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,7,NULL,null,4);