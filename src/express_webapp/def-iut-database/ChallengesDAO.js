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
            const query = 'SELECT * FROM Challenges;';
            db.all(query, function(err, rows) {
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
}

const dao = new ChallengesDAO();
module.exports = dao;
