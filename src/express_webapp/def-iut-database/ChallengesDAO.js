var db = require('./sqlite_connection');

var ChallengesDAO = function() {
    // Insérer un Challenge
    this.insert = function(values, callback) {
        const query = 'INSERT INTO Challenges (titleChallenge, itsCategory, descriptionChallenge, flag, itsDifficulty, reward) VALUES (?, ?, ?, ?, ?, ?)';
        db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID); // Retourne l'ID du nouvel Challenge
        });
    };

    // Mettre à jour un Challenge
    this.update = function(key, values, callback) {
        const query = 'UPDATE Challenges SET titleChallenge = ?, itsCategory = ? , descriptionChallenge = ?, flag = ?, itsDifficulty = ?, reward = ? WHERE idChallenge = ?';
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

    // Supprimer un Challenge
    this.delete = function(key, callback) {
        const query = 'DELETE FROM Challenges WHERE idChallenge = ?';
        db.run(query, [key], function(err) {
            callback(err);
        });
    };

    // Récupérer tous les Challenges
    this.findAll = function(callback) {
        const query = 'SELECT * FROM Challenges';
        db.all(query, function(err, rows) {
            callback(err, rows);
        });
    };
    //Trouver un Challenge par son id
    this.findByID = function(key, callback) {
        const query = 'SELECT * FROM Challenges WHERE idChallenge = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
    //Trouver un Challenge par son title
    this.findByChallengeTitle = function(key, callback) {
        const query = 'SELECT * FROM Challenges WHERE titleChallenge = ?';
        db.get(query, [key], function(err, row) {
            callback(err, row);
        });
    };
};

var dao = new ChallengesDAO();
module.exports = dao;
