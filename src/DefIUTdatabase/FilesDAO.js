var db = require('./sqlite_connection');

var FilesDAO = function() {
    // Insérer un File
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Files (filename, itsChallenge) VALUES (?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Retourne l'ID du nouvel File
        });
    };

    // Mettre à jour un File
    this.update = function(key, values, callback) {
        const query = 'UPDATE Files SET filename = ?, itsChallenge = ? WHERE idFile = ?';
        values.push(key); // Ajouter la clé à la fin du tableau de valeurs
        console.log(values);
        db.run(query, values, function(err) {
            if (err) {
                console.error('SQL Error:', this.sql);
                console.error('Error Message:', err.message);
            }
            callback(err);
        });
    };

    // Supprimer un File
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Files WHERE idFile = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Files
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Files';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver un File par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Files WHERE idFile = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
};

var dao = new FilesDAO();
module.exports = dao;
