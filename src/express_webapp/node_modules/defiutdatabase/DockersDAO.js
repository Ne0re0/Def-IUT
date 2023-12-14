const db = require('./sqlite_connection');

class DockersDAO {

    /**
     * Insert a docker
     * @param {*} values 
     * @returns 
     */
    async insert(values) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Dockers (exposed, itsChallenge) VALUES (?, ?)';
            db.run(query, values, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du nouvel Docker
                }
            });
        });
    }

    /**
     * Update a docker
     * @param {*} key 
     * @param {*} values 
     * @returns 
     */
    update(key, values) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Dockers SET exposed = ?, itsChallenge = ? WHERE idDocker = ?';
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

    /**
     * Delete a docker
     * @param {*} key 
     * @returns 
     */
    delete(key) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Dockers WHERE idDocker = ?';
            db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Returns all dockers
     * @returns 
     */
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dockers';
            db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Returns a docker from its id
     * @param {*} key 
     * @returns 
     */
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Dockers WHERE idDocker = ?';
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

const dao = new DockersDAO();
module.exports = dao;
