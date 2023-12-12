const db = require('./sqlite_connection');

class OwnsDAO {
    // Insérer une association badge user
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (?, ?, ?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel Owns
                }
            });
        });
    }

    // Mettre à jour une association badge user
    update(keys, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Owns SET aUser =?, aBadge = ?, obtentionDate = ? WHERE aUser = ? AND aBadge = ?';
            values.push(keys);
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

    // Supprimer une association badge user
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Owns WHERE aUser = ? AND aBadge = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Owns
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Owns';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }



    // Trouver une association badge user par son user et son badge
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Owns WHERE aUser = ? AND aBadge = ?';
            db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Trouver une association badge user par son user et son badge
    getOwnedBadges(idUser) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT aBadge as idBadge FROM Owns WHERE aUser = ?;';
            db.all(query, [idUser], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getNotOwnedBadges(idUser) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT idBadge FROM Badges EXCEPT SELECT aBadge as idBadge FROM Owns WHERE aUser = ?;';
            db.all(query, [idUser], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

const dao = new OwnsDAO();
module.exports = dao;
