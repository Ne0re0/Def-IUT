const db = require('./sqlite_connection');

class FilesDAO {
    // Insérer un File
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Files (filename, itsChallenge) VALUES (?, ?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel File
                }
            });
        });
    }

    // Mettre à jour un File
    update(key, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Files SET filename = ?, itsChallenge = ? WHERE idFile = ?';
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

    // Supprimer un File
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Files WHERE idFile = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Files
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Files';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver un File par son id
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Files WHERE idFile = ?';
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

const dao = new FilesDAO();
module.exports = dao;
