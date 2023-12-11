// Importation du module sqlite3
const sqlite3 = require('sqlite3');

// Chemin vers la base de données SQLite
const dbPath = 'database.db'; // Remplacez par le chemin de votre base de données

// Création de la connexion à la base de données SQLite
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err.message);
  } else {
    console.log('Connexion à la base de données SQLite réussie');
  }
});

// Exportation de l'objet sqlite3.Database
module.exports = db;
