# Base de donnée

### Utilisation
Pour accéder à la base de données, il faut installer l'utilitaire sqlite3
```bash
sudo apt update
sudo apt install sqlite3
```

### Accès aux données
En ligne de commande : 
```bash
sqlite3 database.db 
# Des requêtes SQL vous seront nécessaires ici
```
Avec le navigateur
```bash
sqlitebrowser database.db 
```

### Réinitialisation
```bash
sqlite3 database.db < creation.sql 
```

