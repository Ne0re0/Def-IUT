-- Drop tables
DROP TABLE IF EXISTS Files;
DROP TABLE IF EXISTS Dockers;
DROP TABLE IF EXISTS HasTried;
DROP TABLE IF EXISTS Owns;
DROP TABLE IF EXISTS Badges;
DROP TABLE IF EXISTS Difficulties;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Challenges;

-- Users
CREATE TABLE Users (
    idUser INTEGER 
        CONSTRAINT pk_Users PRIMARY KEY AUTOINCREMENT,
    mail TEXT 
        CONSTRAINT nn_mail NOT NULL
        CONSTRAINT uq_mail UNIQUE
        CONSTRAINT ck_mail CHECK (mail REGEXP '^[^@]+@.*univ-ubs\.fr$'),
    accountVerified INTEGER
        CONSTRAINT ck_accountVerified CHECK (accountVerified IN (0,1)),
    username TEXT
        CONSTRAINT uq_username UNIQUE
        CONSTRAINT nn_username NOT NULL,
    password TEXT 
        CONSTRAINT nn_password NOT NULL,
    isAdmin INTEGER
        CONSTRAINT ck_isAdmin CHECK (accountVerified IN (0,1))
);

-- Badges
CREATE TABLE Badges (
    idBadge INTEGER 
        CONSTRAINT pk_Badges PRIMARY KEY AUTOINCREMENT,
    titleBadge TEXT
        CONSTRAINT nn_titleBadge NOT NULL
        CONSTRAINT uq_titleBadge UNIQUE,
    descriptionBadge TEXT 
        CONSTRAINT nn_descriptionBadge NOT NULL
);

-- Difficulty
CREATE TABLE Difficulties (
    idDifficulty TEXT 
        CONSTRAINT pk_Difficulties PRIMARY KEY
);

-- Categories
CREATE TABLE Categories (
    idCategory TEXT 
        CONSTRAINT pk_Categories PRIMARY KEY
);

-- Owns
CREATE TABLE Owns (
    aUser INTEGER,
    aBadge INTEGER,
    obtentionDate DATE 
        CONSTRAINT nn_obtentionDate NOT NULL,
    CONSTRAINT pk_Owns PRIMARY KEY (aUser, aBadge),
    CONSTRAINT fk_Owns_Users FOREIGN KEY (aUser) REFERENCES Users(idUser),
    CONSTRAINT fk_Owns_Badges FOREIGN KEY (aBadge) REFERENCES Badges(idBadge)
);

-- Challenges
CREATE TABLE Challenges (
    idChallenge INTEGER 
        CONSTRAINT pk_Challenges PRIMARY KEY AUTOINCREMENT,
    titleChallenge TEXT 
        CONSTRAINT nn_titleChallenge NOT NULL
        CONSTRAINT uq_titleChallenge UNIQUE,
    itsCategory TEXT 
        CONSTRAINT nn_itsCategory NOT NULL 
        CONSTRAINT fk_Challenges_Categories REFERENCES Categories(idCategory),
    descriptionChallenge TEXT 
        CONSTRAINT nn_descriptionChallenge NOT NULL,
    flag TEXT 
        CONSTRAINT nn_flag NOT NULL,
    itsDifficulty TEXT 
        CONSTRAINT nn_itsDifficulty NOT NULL 
        CONSTRAINT fk_Challenges_Difficulties REFERENCES Difficulties(idDifficulty),
    reward INTEGER 
        CONSTRAINT nn_rewardNOT NULL 
        CONSTRAINT ck_reward CHECK (reward >= 0)
);

-- HasTried
CREATE TABLE HasTried (
    aUser INTEGER,
    aChallenge INTEGER,
    flagged DATE,
    retryNb INTEGER DEFAULT 0
        CONSTRAINT nn_retryNb NOT NULL 
        CONSTRAINT ck_HasTried_retryNb CHECK (retryNb >= 0),
    CONSTRAINT pk_HasTried PRIMARY KEY (aUser, aChallenge),
    CONSTRAINT fk_HasTried_Users FOREIGN KEY (aUser) REFERENCES Users(idUser),
    CONSTRAINT fk_HasTried_Challenges FOREIGN KEY (aChallenge) REFERENCES Challenges(idChallenge)
);

-- Dockers
CREATE TABLE Dockers (
    idDocker INTEGER CONSTRAINT pk_Dockers PRIMARY KEY AUTOINCREMENT,
    exposed INTEGER 
        CONSTRAINT nn_exposed NOT NULL
        CONSTRAINT ck_port CHECK (exposed > 0 AND exposed <= 65535),
    itsChallenge INTEGER 
        CONSTRAINT uk_Docker_itsChallenge UNIQUE
        CONSTRAINT nn_Docker_itsChallenge NOT NULL,
    CONSTRAINT fk_Docker_Challenge FOREIGN KEY (itsChallenge) REFERENCES Challenges(idChallenge)
);

-- Files
CREATE TABLE Files (
    idFile INTEGER 
        CONSTRAINT pk_Files PRIMARY KEY AUTOINCREMENT,
    filename TEXT 
        CONSTRAINT nn_filename NOT NULL,
    itsChallenge INTEGER
        CONSTRAINT nn_Files_itsChallenge NOT NULL
        CONSTRAINT uq_Files_itsChallenges UNIQUE,
    CONSTRAINT fk_Files_Challenges FOREIGN KEY (itsChallenge) REFERENCES Challenges(idChallenge)

);