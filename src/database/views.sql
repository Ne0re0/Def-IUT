-- Delete view if exists
DROP VIEW IF EXISTS DistinguishedUsers;
-- Create view
CREATE VIEW DistinguishedUsers AS
SELECT
    Users.idUser,
    Users.mail,
    Users.accountVerified,
    Users.username,
    Users.password,
    Users.isAdmin,
    COALESCE(COUNT(DistinguishedChallenges.reward), 0) AS challengeCount,
    COALESCE(SUM(CASE WHEN flagged IS NULL THEN 0 ELSE reward END), 0) AS score
FROM
    Users
LEFT JOIN
    HasTried ON Users.idUser = HasTried.aUser
LEFT JOIN
    DistinguishedChallenges ON HasTried.aChallenge = DistinguishedChallenges.idChallenge
GROUP BY
    Users.idUser,
    Users.mail,
    Users.accountVerified,
    Users.username,
    Users.password,
    Users.isAdmin;



-- Delete view if exists
DROP VIEW IF EXISTS FullyDistinguishedUsers;
-- Create view
CREATE VIEW FullyDistinguishedUsers AS
SELECT
    idUser,
    mail,
    accountVerified,
    username,
    password,
    isAdmin,
    ROW_NUMBER() OVER (ORDER BY score DESC, challengeCount DESC) AS rank,
    score,
    challengeCount
FROM
    DistinguishedUsers
ORDER BY rank;


-- Delete view if exists
DROP VIEW IF EXISTS DistinguishedChallenges;
-- Create view
CREATE VIEW DistinguishedChallenges AS
SELECT
    idChallenge,
    titleChallenge,
    itsCategory,
    descriptionChallenge,
    flag,
    itsDifficulty,
    difficultyString AS itsDifficultyString,
    (100 + itsDifficulty*100) AS reward
FROM
    Challenges JOIN Difficulties ON itsDifficulty = idDifficulty
ORDER BY idChallenge;
