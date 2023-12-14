const db = require('./sqlite_connection');
class FullyDistinguishedUsersDAO {

    /**
     * Returns all users
     * @returns 
     */
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM FullyDistinguishedUsers ORDER BY Rank';
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
     * Returns all users
     * @returns 
     */
    findFirst50() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM FullyDistinguishedUsers WHERE ROWNUM <= 50;';
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
     * Returns a user from its id
     * @param {*} key 
     * @returns 
     */
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM FullyDistinguishedUsers WHERE idUser = ?';
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

const dao = new FullyDistinguishedUsersDAO();
module.exports = dao;
