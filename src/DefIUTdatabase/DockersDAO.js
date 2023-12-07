var db = require('./sqlite_connection');

var DockersDAO = function() {
    // Insérer un Docker
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Dockers (exposed, itsChallenge) VALUES (?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Retourne l'ID du nouvel Docker
        });
    };

    // Mettre à jour un Docker
    this.update = function(key, values, callback) {
        const query = 'UPDATE Dockers SET exposed = ?, itsChallenge = ? WHERE idDocker = ?';
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

    // Supprimer un Docker
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Dockers WHERE idDocker = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Dockers
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Dockers';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver un Docker par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Dockers WHERE idDocker = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
};

var dao = new DockersDAO();
module.exports = dao;
