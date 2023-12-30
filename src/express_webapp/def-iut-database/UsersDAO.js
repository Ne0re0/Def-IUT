const bcrypt = require('bcrypt');

class UserDAO {

    constructor(database) {
        this.db = database;
    }

    /**
     * Insert user
     * @param {*} values 
     * @returns user ID if successfull
     */
    insert(mail, accountVerified, username, password, isAdmin) {
        console.log(mail);
        console.log(accountVerified);
        console.log(username);
        console.log(password);
        console.log(isAdmin);
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO Users (mail, accountVerified, username, password, isAdmin) VALUES (?, ?, ? ,? ,?)';
      
          bcrypt.genSalt(10)
            .then((salt) => {
              bcrypt.hash(password, salt)
                .then((hash) => {
                  console.log(hash)
                  this.db.run(query, [mail, accountVerified, username, hash, isAdmin], function(err) {
                    if (err) {
                      console.log("Insertion échouée " + err)
                      reject(err);
                    } else {
                      console.log("Insertion réussie")
                      resolve(this.lastID);
                    }
                  });
                })
                .catch((err) => {
                  console.log("Erreur lors du hachage du mot de passe " + err);
                  reject(err);
                });
            })
            .catch((err) => {
              console.log("Erreur lors de la génération du sel " + err);
              reject(err);
            });
        });
      }
      
      
      

    /**
     * Update user
     * @param {*} key User id
     * @param {*} values New user values
     * @returns 
     */
    update(key, values) {
        return new Promise((resolve, reject) => {
            if (values.password && !bcrypt.getRounds(values.password)) {
                bcrypt.genSalt(10)
                    .then((salt) => {
                        bcrypt.hash(values.password, salt)
                            .then((hash) => {
                                values.password = hash;
                                this.performUpdate(key, values, resolve, reject);
                            })
                            .catch((err) => {
                                console.error('Error hashing password:', err);
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        console.error('Error generating salt:', err);
                        reject(err);
                    });
            } else {
                this.performUpdate(key, values, resolve, reject);
            }
        });
    }

    verifyAccount(mail) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Users SET accountVerified = 1 WHERE mail = ?';
            this.db.run(query, [mail], function(err) {
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

    updatePassword(mail,password) {
        const query = 'UPDATE Users SET password = ? WHERE mail = ?';

        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10)
                .then((salt) => {
                    bcrypt.hash(password, salt)
                        .then((hash) => {
                            console.log(mail,hash)
                            console.log(typeof mail, typeof hash)
                            this.db.run(query, [hash.toString(),mail.toString()], function(err) {
                                if (err) {
                                    console.error('SQL Error:', this.sql);
                                    console.error('Error Message:', err.message);
                                    reject(err);
                                } else {
                                    console.log("Password updated")
                                    resolve();
                                }
                            });
                        })
                        .catch((err) => {
                            console.error('Error hashing password:', err);
                            reject(err);
                        });
                })
                .catch((err) => {
                    console.error('Error generating salt:', err);
                    reject(err);
                });
        });
    }

    performUpdate(key, values, resolve, reject) {
        const query = 'UPDATE Users SET mail = ?, accountVerified = ?, username = ?, password = ?, isAdmin = ? WHERE idUser = ?';
        values.push(key); // Ajouter la clé à la fin du tableau de valeurs
        this.db.run(query, values, function(err) {
            if (err) {
                console.error('SQL Error:', this.sql);
                console.error('Error Message:', err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    }


    // Delete users
    delete(key) {
        return new Promise((resolve, reject) => {
            console.log(key);
            const query = 'DELETE FROM Users WHERE idUser = ?';
            this.db.run(query, [key], function(err) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Utilisateur supprimé');
                    resolve();
                }
            });
        });
    }

    connect(usernameOrMail, clearPassword) {
        return new Promise((resolve, reject) => {
          // Retrieve possible valid user
          var query = "SELECT * FROM Users WHERE mail = ? UNION SELECT * FROM Users WHERE username = ?;";
          this.db.get(query, [usernameOrMail, usernameOrMail], (err, row) => {
            if (err) {
              reject("Erreur lors de la réception de l'utilisateur");
            } else if (!row) {
              reject("Utilisateur non trouvé");
            } else {
              bcrypt.compare(clearPassword, row.password, (err, valid) => {
                if (err) {
                  reject("Erreur lors du chiffrement du mot de passe");
                } else if (valid) {
                  resolve(row);
                } else {
                  reject("Nom d'utilisateur/Mot de passe invalides");
                }
              });
            }
          });
        });
      }
      

    // Retrieve all users
    findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users';
            this.db.all(query, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Retrieve a user from a mail
    findByMail(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE mail = ?';
            this.db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Retrieve a user from its ID
    findByID(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE idUser = ?';
            this.db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Retrieve a user from its username
    findByUsername(key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE username = ?';
            this.db.get(query, [key], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * @param {int} key 
     * @returns the last five challenges flagged
     */
    getHistory(key){
        return new Promise((resolve,reject) => {
            const query = "SELECT idChallenge,titleChallenge,itsCategory,reward,flagged FROM (SELECT * FROM HasTried JOIN DistinguishedChallenges ON idChallenge = aChallenge WHERE aUser = ? AND flagged IS NOT NULL ORDER BY flagged DESC) LIMIT 10;";         
            this.db.all(query,[key],function(err,rows) {
                if (err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

const db = require('./sqlite_connection');
const dao = new UserDAO(db);
module.exports = dao;
