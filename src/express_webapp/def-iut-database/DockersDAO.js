const db = require('./sqlite_connection');

class DockersDAO {
    // Insérer un Docker
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Dockers (exposed, itsChallenge) VALUES (?, ?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel Docker
                }
            });
        });
    }

    // Mettre à jour un Docker
    update(key, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Dockers SET exposed = ?, itsChallenge = ? WHERE idDocker = ?';
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

    // Supprimer un Docker
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Dockers WHERE idDocker = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Dockers
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dockers';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver un Docker par son id
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dockers WHERE idDocker = ?';
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

const dao = new DockersDAO();
module.exports = dao;
