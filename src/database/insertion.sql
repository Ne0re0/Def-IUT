DELETE FROM Difficulties;
DELETE FROM Categories;
DELETE FROM Badges;
DELETE FROM Users;

-- Difficulties
INSERT INTO Difficulties VALUES ('Débutant');
INSERT INTO Difficulties VALUES ('Facile');
INSERT INTO Difficulties VALUES ('Moyen');
INSERT INTO Difficulties VALUES ('Difficile');
INSERT INTO Difficulties VALUES ('Très difficile');

-- Categories
INSERT INTO Categories VALUES ('Web');
INSERT INTO Categories VALUES ('Reverse');
INSERT INTO Categories VALUES ('Programmation');
INSERT INTO Categories VALUES ('Cryptanalyse');
INSERT INTO Categories VALUES ('Réseau');
INSERT INTO Categories VALUES ('Autre');

-- Badges
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Bienvenue','Valider son premier défi');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('First try','Valider un défi du premier coup');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Fisrt blood','Être le premier utilisateur de la plateforme à valider un défi');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Happy hour','Valider un défi un jeudi entre 17 et 19 heures');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Persévérant','Réaliser au moins 10 tentatives erronées avant de valider un défi');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Explorateur','Valider un défi de chaque catégorie');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Completionniste','Valider tous les défis de la plateforme');
INSERT INTO Badges(titleBadge,descriptionBadge) VALUES('Hackerman','Obtenir tous les badges');

-- Users
-- admin:admin
INSERT INTO Users(mail,accountVerified,username,password,isAdmin) VALUES ('admin@univ-ubs.fr',1,'admin','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);