var db = require('./sqlite_connection');

var UserDAO = function() {
    // Insérer un utilisateur
    this.insert = function(values, callback) {
        const query = 'INSERT INTO User ( mail,nom,prenom,datedenaissance,sexe,taille,poids,password) VALUES (?, ?, ? ,? ,? ,? ,? ,? )';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Retourne l'ID du nouvel utilisateur
        });
    };

    // Mettre à jour un utilisateur
    this.update = function(key, values, callback) {
        const query = 'UPDATE User SET mail = ?,nom = ?, prenom = ?, datedenaissance = ?, sexe = ?, taille = ?, poids = ?, password = ? WHERE idUser = ?';
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

    // Supprimer un utilisateur
    this.delete = function(key, callback) {
        const query = 'DELETE FROM User WHERE idUser = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les utilisateurs
    this.findAll = function(callback) {
        const query = 'SELECT * FROM User';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };

    // Trouver un utilisateur par sa clé mail
    this.findByMail = function(key, callback) {
        const query = 'SELECT * FROM User WHERE mail = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    //TRouver un user par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM User WHERE idUser = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
};

var dao = new UserDAO();
module.exports = dao;
