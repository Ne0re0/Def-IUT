const db = require('./sqlite_connection');

class ChallengesDAO {
    // Insérer un Challenge
    insert(titleChallenge,itsCategory,descriptionChallenge,flag,itsDifficulty,connection) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, connection) VALUES (?, ?, ?, ?, ?, ?)';
            db.run(query, [titleChallenge,itsCategory,descriptionChallenge,flag,itsDifficulty,connection], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel Challenge
                }
            });
        });
    }

    // Mettre à jour un Challenge
    update(idChallenge, title, category,description,flag,difficulty,connection) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Challenges SET titleChallenge = ?, itsCategory = ? , descriptionChallenge = ?, flag = ?, itsDifficulty = ?, connection = ? WHERE idChallenge = ?';
            db.run(query, [title, category,description,flag,difficulty,connection, idChallenge], function(err) {
                if (err) {
                    console.error('SQL Error:', this.sql);
                    console.error('Error Message:', err.message);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Supprimer un Challenge
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Challenges WHERE idChallenge = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Challenges
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DistinguishedChallenges;';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    findAllKnowingUser(idUser) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DistinguishedChallenges LEFT JOIN (SELECT * FROM HasTried WHERE aUser = ?) ON aChallenge = idCHallenge ORDER BY flagged,reward,titleChallenge ;';
            db.all(query,[idUser] ,function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver un Challenge par son id
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DistinguishedChallenges WHERE idChallenge = ?';
            db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Trouver un Challenge par son title
    findByChallengeTitle(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM DistinguishedChallenges WHERE titleChallenge = ?';
            db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Compter le nombre de catégories distinctes
    countCategories() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(DISTINCT itsCategory) AS categoryCount FROM Challenges';
            db.get(query, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.categoryCount);
                }
            });
        });
    }

    // Vérifier si un utilisateur a réussi un challenge de chaque catégorie
    successedCategory(userId) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT COUNT(*) AS categoryCount
            FROM (
                SELECT C.itsCategory, COUNT(HT.aChallenge) AS count
                FROM Challenges C
                LEFT JOIN HasTried HT ON C.idChallenge = HT.aChallenge AND HT.aUser = ?
                WHERE HT.flagged IS NOT NULL
                GROUP BY C.itsCategory
            ) AS nbUnsuccessful;
            `;
    
            db.get(query, [userId], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

const dao = new ChallengesDAO();
module.exports = dao;
