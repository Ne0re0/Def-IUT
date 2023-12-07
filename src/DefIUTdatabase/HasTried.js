var db = require('./sqlite_connection');

var HasTriedDAO = function() {
    // Insérer un HasTried
    this.insert = function(values, callback) {
        const query = 'INSERT INTO HasTried (aUser, aChallenge, flagged , retryNB) VALUES (?, ?, ?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
        });
    };

    // Mettre à jour un HasTried
    this.update = function(key, values, callback) {
        const query = 'UPDATE HasTried SET aUser = ?, aChallenge = ?, flagged = ?, retryNB = ? WHERE aUser = ? AND aChallenge = ?';
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

    // Supprimer un HasTried
    this.delete = function(key, callback) {
        const query = 'DELETE FROM HasTried WHERE aUser = ? AND aChallenge = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les HasTried
    this.findAll = function(callback) {
        const query = 'SELECT * FROM HasTried';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver un HasTried par son user et challenge associé
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM HasTried WHERE aUser = ? AND aChallenge = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    
};

var dao = new HasTriedDAO();
module.exports = dao;
