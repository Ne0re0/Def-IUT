const db = require('./sqlite_connection');

class HasTriedDAO {
    // Insérer un HasTried
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO HasTried (aUser, aChallenge, flagged , retryNB) VALUES (?, ?, ?, ?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel HasTried
                }
            });
        });
    }

    // Mettre à jour un HasTried
    update(key, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE HasTried SET aUser = ?, aChallenge = ?, flagged = ?, retryNB = ? WHERE aUser = ? AND aChallenge = ?';
            values.push(key); // Ajouter la clé à la fin du tableau de valeurs
            db.run(query, values, function(err) {
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
            const query = 'SELECT flagged,reward FROM HasTried JOIN Challenges ON aChallenge = idChallenge WHERE aUser = ? ORDER BY flagged DESC';
            db.all(query, [idUser],function(err, rows) {
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
}

const dao = new HasTriedDAO();
module.exports = dao;
