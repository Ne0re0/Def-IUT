var db = require('./sqlite_connection');

var OwnsDAO = function() {
    // Insérer une association badge user
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (?, ?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            
        });
    };

    // Mettre à jour une association badge user
    this.update = function(keys,values, callback) {
        const query = 'UPDATE Owns SET aUser =?, aBadge = ? obtentionDate = ? WHERE aUser = ? AND aBadge = ?';
        values.push(keys);
         // Ajouter la clé à la fin du tableau de valeurs
        db.run(query, values, function(err) {
            if (err) {
                console.error('SQL Error:', this.sql);
                console.error('Error Message:', err.message);
            }
            callback(err);
        });
    };

    // Supprimer une association badge user
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Owns WHERE aUser = ? AND aBadge = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Owns
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Owns';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver une association badge user par son user et son badge
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Owns WHERE aUser = ? AND aBadge = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    
};

var dao = new OwnsDAO();
module.exports = dao;
