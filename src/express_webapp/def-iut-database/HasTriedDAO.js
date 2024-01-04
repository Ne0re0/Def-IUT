const db = require('./sqlite_connection');

class HasTriedDAO {
    // Insérer un HasTried
    insert(aUser, aChallenge, flagged, retryNB) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO HasTried (aUser, aChallenge, flagged , retryNB) VALUES (?, ?, ?, ?)';
            db.run(query, [aUser, aChallenge, flagged, retryNB], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel HasTried
                }
            });
        });
    }

    // Mettre à jour un HasTried
    update(aUser, aChallenge, flagged, retryNB) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE HasTried SET aUser = ?, aChallenge = ?, flagged = ?, retryNB = ? WHERE aUser = ? AND aChallenge = ?';
            db.run(query, [aUser, aChallenge, flagged, retryNB, aUser, aChallenge], function(err) {
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

    // Supprimer un HasTried
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM HasTried WHERE aUser = ? AND aChallenge = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les HasTried
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM HasTried';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Returns challenges that have been flagged by a specific user
     * 
     */
    getFlagged(idUser) {
        return new Promise((resolve, reject) => {
            console.log("debug")
            const query = 'SELECT flagged,reward FROM HasTried JOIN DistinguishedChallenges ON aChallenge = idChallenge WHERE aUser = ? and flagged IS NOT NULL ORDER BY flagged DESC';
            db.all(query, [idUser],function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Return true if the challenge have been flagged by a specific user
     * 
     */
    isFlagged(idUser, idChallenge) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) AS count FROM HasTried WHERE aUser = ? AND aChallenge = ? AND flagged IS NOT NULL';
            db.get(query, [idUser, idChallenge], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.count);
                }
            });
        });
    }

    getFlagDate(idUser, idChallenge) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT flagged FROM HasTried WHERE aUser = ? AND aChallenge = ? AND flagged IS NOT NULL';
            db.get(query, [idUser, idChallenge], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }


    /**
     * Returns users that have flagged ordered by ascendant dates
     */
    getSuccessfulUsers(challengeId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM HasTried JOIN FullyDistinguishedUsers ON aUser = idUser WHERE aChallenge = ? AND flagged IS NOT NULL ORDER BY flagged ASC`;
            db.all(query, [challengeId], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver un HasTried par son user et challenge associé
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM HasTried WHERE aUser = ? AND aChallenge = ?';
            db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Obtenir le nombre d'essais pour un utilisateur et un challenge spécifiques
    getRetryCount(userId, challengeId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT retryNb FROM HasTried WHERE aUser = ? AND aChallenge = ?';
            db.get(query, [userId, challengeId], function(err, row) {
                if (err) {
                reject(err);
                } else {
                resolve(row ? row.retryNb : 0);
                }
            });
        });
    }
}

const dao = new HasTriedDAO();
module.exports = dao;
