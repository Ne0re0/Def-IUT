var db = require('./sqlite_connection');

var BadgesDAO = function() {
    // Insérer un Badge
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Badges (titleBadge, descriptionBadge) VALUES (?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Retourne l'ID du nouvel Badge
        });
    };

    // Mettre à jour un Badge
    this.update = function(key, values, callback) {
        const query = 'UPDATE Badges SET titleBadge = ?, descriptionBadge = ? WHERE idBadges = ?';
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

    // Supprimer un Badge
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Badges WHERE idBadges = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Badges
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Badges';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver un Badge par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Badges WHERE idBadges = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    //Trouver un Badge par son title
    this.findByBadgesname = function(key, callback) {
        const query = 'SELECT * FROM Badges WHERE titleBadge = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
};

var dao = new BadgesDAO();
module.exports = dao;
