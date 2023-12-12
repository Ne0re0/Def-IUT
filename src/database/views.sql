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
    COALESCE(SUM(CASE WHEN flagged IS NULL THEN 0 ELSE reward END), 0) AS score
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
