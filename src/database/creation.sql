-- Drop tables
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
        CONSTRAINT ck_mail CHECK (mail LIKE '%univ-ubs.fr'),
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
        CONSTRAINT pk_Badges PRIMARY KEY    ,
    titleBadge TEXT
        CONSTRAINT nn_titleBadge NOT NULL
        CONSTRAINT uq_titleBadge UNIQUE,
    descriptionBadge TEXT 
        CONSTRAINT nn_descriptionBadge NOT NULL
);

-- Difficulty
CREATE TABLE Difficulties (
    idDifficulty INTEGER
        CONSTRAINT pk_Difficulties PRIMARY KEY,
    difficultyString TEXT 
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
    itsDifficulty INTEGER
        CONSTRAINT nn_itsDifficulty NOT NULL 
        CONSTRAINT fk_Challenges_Difficulties REFERENCES Difficulties(idDifficulty),
    connection TEXT
);

-- HasTried
CREATE TABLE HasTried (
    aUser INTEGER,
    aChallenge INTEGER,
    flagged TEXT,
    hour TEXT,
    retryNb INTEGER DEFAULT 0
        CONSTRAINT nn_retryNb NOT NULL 
        CONSTRAINT ck_HasTried_retryNb CHECK (retryNb >= 0),
    CONSTRAINT pk_HasTried PRIMARY KEY (aUser, aChallenge),
    CONSTRAINT fk_HasTried_Users FOREIGN KEY (aUser) REFERENCES Users(idUser),
    CONSTRAINT fk_HasTried_Challenges FOREIGN KEY (aChallenge) REFERENCES Challenges(idChallenge)
);
