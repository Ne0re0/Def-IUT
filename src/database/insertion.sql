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