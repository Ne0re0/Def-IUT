var db = require('./sqlite_connection');

var CategoriesDAO = function() {
    // Insérer une Categorie
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Categories (idCategory) VALUES (?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            
        });
    };

    // Mettre à jour une Categorie
    this.update = function(key, callback) {
        const query = 'UPDATE Categories SET idCategory = ? WHERE idCategory = ?';
         // Ajouter la clé à la fin du tableau de valeurs
        console.log(key);
        db.run(query, key, function(err) {
            if (err) {
                console.error('SQL Error:', this.sql);
                console.error('Error Message:', err.message);
            }
            callback(err);
        });
    };

    // Supprimer une Categorie
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Categories WHERE idCategory = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Categories
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Categories';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver une Categorie par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Categories WHERE idCategory = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    
};

var dao = new CategoriesDAO();
module.exports = dao;
