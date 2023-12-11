const db = require('./sqlite_connection');

class BadgesDAO {
    // Insérer un Badge
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Badges (titleBadge, descriptionBadge) VALUES (?, ?)';
            db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel Badge
                }
            });
        });
    }

    // Mettre à jour un Badge
    update(key, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Badges SET titleBadge = ?, descriptionBadge = ? WHERE idBadges = ?';
            values.push(key); // Ajouter la clé à la fin du tableau de valeurs
            db.run(query, values, function (err) {
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

    // Supprimer un Badge
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Badges WHERE idBadges = ?';
            db.run(query, [key], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Badges
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Badges';
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver un Badge par son id
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Badges WHERE idBadges = ?';
            db.get(query, [key], function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Trouver un Badge par son titre
    findByBadgesname(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Badges WHERE titleBadge = ?';
            db.get(query, [key], function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

const dao = new BadgesDAO();
module.exports = dao;
