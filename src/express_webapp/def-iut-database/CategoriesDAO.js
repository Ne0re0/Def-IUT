const db = require('./sqlite_connection');

class CategoriesDAO {
    // Insérer une Categorie
    insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Categories (idCategory) VALUES (?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    // Mettre à jour une Categorie
    update(key) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Categories SET idCategory = ? WHERE idCategory = ?';
            db.run(query, key, function(err) {
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

    // Supprimer une Categorie
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Categories WHERE idCategory = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Récupérer tous les Categories
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Categories';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Trouver une Categorie par son id
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Categories WHERE idCategory = ?';
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

const dao = new CategoriesDAO();
module.exports = dao;
