DELETE FROM Challenges;
DELETE FROM Difficulties;
DELETE FROM Categories;
DELETE FROM Badges;
DELETE FROM Users;

-- Difficulties
INSERT INTO Difficulties(idDifficulty,difficultyString) VALUES (1,'Débutant');
INSERT INTO Difficulties(idDifficulty,difficultyString) VALUES (2,'Facile');
INSERT INTO Difficulties(idDifficulty,difficultyString) VALUES (3,'Moyen');
INSERT INTO Difficulties(idDifficulty,difficultyString) VALUES (4,'Difficile');
INSERT INTO Difficulties(idDifficulty,difficultyString) VALUES (5,'Très difficile');

-- Categories
INSERT INTO Categories VALUES ('Web');
INSERT INTO Categories VALUES ('Reverse');
INSERT INTO Categories VALUES ('Programmation');
INSERT INTO Categories VALUES ('Cryptanalyse');
INSERT INTO Categories VALUES ('Réseau');
INSERT INTO Categories VALUES ('Autre');

-- Badges
INSERT INTO Badges(idBadge,titleBadge,descriptionBadge) VALUES(1,'Bienvenue','Valider son premier défi');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(2,'First try','Valider un défi du premier coup');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(3,'First blood','Être le premier utilisateur de la plateforme à valider un défi');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(4,'Happy hour','Valider un défi un jeudi entre 17 et 19 heures');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(5,'Persévérant','Réaliser au moins 10 tentatives erronées avant de valider un défi');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(6,'Explorateur','Valider un défi de chaque catégorie');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(7,'Completionniste','Valider tous les défis de la plateforme');
INSERT INTO Badges(idbadge,titleBadge,descriptionBadge) VALUES(8,'Hackerman','Obtenir tous les badges');

-- Users
-- admin:admin
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (1,'admin@univ-ubs.fr',1,'admin','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);

-- Challenges
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty) VALUES ("Premier challenge","Autre","Pour ce challenge, vous devrez entrer DEF{flag}","DEF{flag}",1);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty) VALUES ("Deuxième challenge","Autre","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",2);
INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty) VALUES ("Troisième challenge","Programmation","Le flag est la réponse à la formule suivante : 4*2. N'oubliez pas d'entourer la réponse dans DEF{la réponse ici}","DEF{8}",3);