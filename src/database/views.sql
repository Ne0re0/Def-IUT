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
    COALESCE(COUNT(Challenges.reward), 0) AS challengeCount,
    COALESCE(SUM(Challenges.reward), 0) AS score
FROM
    Users
LEFT JOIN
    HasTried ON Users.idUser = HasTried.aUser
LEFT JOIN
    Challenges ON HasTried.aChallenge = Challenges.idChallenge
GROUP BY
    Users.idUser,
    Users.mail,
    Users.accountVerified,
    Users.username,
    Users.password,
    Users.isAdmin;


-- Delete view if exists
DROP VIEW IF EXISTS Scoreboard;
-- Create view
CREATE VIEW Scoreboard AS
SELECT
    ROW_NUMBER() OVER (ORDER BY score DESC, challengeCount DESC) AS rank,
    score,
    idUser,
    challengeCount
FROM
    DistinguishedUsers
ORDER BY score DESC, challengeCount DESC;
