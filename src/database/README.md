# Base de données

## Schéma relationnel

### Tableau pour la table `Users`
| idUser (1) | Identifiant de l'utilisateur |
| ---- | ---- |
| mail (2) | Adresse e-mail de l'utilisateur (doit se terminer par `univ-ubs.fr') |
| accountVerified (NN) | Statut de vérification du compte (0 ou 1) |
| username (3) | Nom d'utilisateur  |
| password (NN) | Mot de passe (à des fins de sécurité, est chiffré) |
| isAdmin (NN) | Statut administrateur (0 ou 1) (non utilisé pour le moment) |
**Description :** La table `Users` stocke les informations sur les utilisateurs du système, y compris leur adresse e-mail, statut de vérification du compte, nom d'utilisateur, mot de passe et statut administrateur.

### Tableau pour la table `Badges`
| idBadge (1) | Identifiant du badge |
| ---- | ---- |
| titleBadge (2) | Titre du badge |
| descriptionBadge (NN) | Description du badge |
**Description :** La table `Badges` stocke des informations sur les badges qui peuvent être attribués aux utilisateurs.

### Tableau pour la table `Difficulties`
| idDifficulty (1) | Identifiant du niveau de difficulté |
| ---- | ---- |
| difficultyString (2) | Chaîne de caractères représentant le niveau de difficulté |
**Description :** La table `Difficulties` stocke les niveaux de difficulté possibles pour les défis.

### Tableau pour la table `Categories`
| idCategory (1) | Identifiant de la catégorie |
| ---- | ---- |
**Description :** La table `Categories` stocke les catégories auxquelles peuvent appartenir les défis.

### Tableau pour la table `Owns`
| **aUser (1)** | **Identifiant de l'utilisateur qui possède le badge** |
| ---- | ---- |
| **aBadge (1)** | **Identifiant du badge possédé par l'utilisateur** |
| obtentionDate (NN) | Date à laquelle le badge a été obtenu |
**Description :** La table `Owns` établit la relation entre les utilisateurs et les badges qu'ils possèdent.

### Tableau pour la table `Challenges`
| **idChallenge** (1) | **Identifiant du défi** |
| ---- | ---- |
| titleChallenge (2)  | Titre du défi |
| itsCategory = Category.idCategory (NN) | Catégorie du défi |
| descriptionChallenge (NN) | Description du défi |
| flag (NN) | Marque distinctive du défi |
| itsDifficulty = Difficulties.idDifficulty (NN) | Niveau de difficulté du défi |
| connection | Connexion associée au défi |
**Description :** La table `Challenges` stocke des informations sur les défis proposés.

### Tableau pour la table `HasTried`
| **aUser (1)** | **Identifiant de l'utilisateur qui a essayé le défi** |
| ---- | ---- |
| **aChallenge (1)** | **Identifiant du défi essayé par l'utilisateur** |
| flagged | Marque distinctive du défi essayé |
| hour | Heure à laquelle le défi a été essayé |
| retryNb (NN) | Nombre de tentatives pour le défi (par défaut à 0) |
**Description :** La table `HasTried` enregistre les tentatives des utilisateurs pour résoudre les défis, avec des détails tels que la marque distinctive, l'heure et le nombre de tentatives. Tant que la challenge n'a pas été validé, les colonnes `flagged` et `hour` sont `null`.

### Vues

#### 1. `DistinguishedUsers`
| idUser | Identifiant de l'utilisateur |
| ---- | ---- |
| mail | Adresse e-mail de l'utilisateur |
| accountVerified | Statut de vérification du compte |
| username | Nom d'utilisateur |
| password | Mot de passe (à des fins de sécurité, ne devrait pas être stocké en clair) |
| isAdmin | Statut administrateur |
| **challengeCount** | **Nombre total de défis essayés par l'utilisateur** |
| **score** | **Score cumulatif basé sur les défis essayés et les récompenses associées** |
**Description :** La vue `DistinguishedUsers` agrège des informations sur les utilisateurs, y compris le nombre total de défis essayés et le score cumulatif en fonction des défis réussis.

#### 2. `FullyDistinguishedUsers`
| idUser | Identifiant de l'utilisateur |
| ---- | ---- |
| mail | Adresse e-mail de l'utilisateur |
| accountVerified | Statut de vérification du compte |
| username | Nom d'utilisateur |
| password | Mot de passe (à des fins de sécurité, ne devrait pas être stocké en clair) |
| isAdmin | Statut administrateur |
| challengeCount | Nombre total de défis essayés par l'utilisateur |
| score | Score cumulatif basé sur les défis essayés et les récompenses associées |
| **rank** | **Classement de l'utilisateur en fonction du score et du nombre de défis** |
**Description :** La vue `FullyDistinguishedUsers` étend la vue `DistinguishedUsers` en ajoutant un classement aux utilisateurs en fonction de leur score.

#### 3.`DistinguishedChallenges`
| idChallenge | Identifiant du défi |
| ---- | ---- |
| titleChallenge | Titre du défi |
| itsCategory | Catégorie du défi |
| descriptionChallenge | Description du défi |
| flag | Réponse au défi |
| itsDifficulty | Niveau de difficulté du défi |
| connection | Connexion associée au défi |
| **itsDifficultyString** | **Chaîne de caractères représentant le niveau de difficulté du défi** |
| **reward** | **Récompense associée au défi (calculée en fonction de la difficulté)** |
**Description :** La vue `DistinguishedChallenges` ajoute la chaîne de caractères liée à la difficulté ainsi que le score calculé de la manière suivante : `score = 100 + difficulty*100`


## Remplissage par défaut de la base de données

### Table `Badges`
| idBadge (1) | titleBadge (2) | descriptionBadge (NN) |
| ---- | ---- | ---- |
| 1 | Bienvenue | Valider son premier défi |
| 2 | First try | Valider un défi du premier coup |
| 3 | First blood | Être le premier utilisateur de la plateforme à valider un défi |
| 4 | Happy hour | Valider un défi un jeudi entre 17 et 19 heures |
| 5 | Persévérant | Réaliser au moins 10 tentatives erronées avant de valider un défi |
| 6 | Explorateur | Valider un défi de chaque catégorie |
| 7 | Completionniste | Valider tous les défis de la plateforme |
| 8 | Hackerman | Obtenir tous les badges |

### Table `Categories`
| idCategory (1) |
| ---- |
| Web |
| Reverse |
| Programmation |
| Cryptanalyse |
| Réseau |
| Autre |
### Table `Difficulties`
| idDifficulty (1) | difficultyString (2) |
| ---- | ---- |
| 1 | Débutant |
| 2 | Facile |
| 3 | Moyen |
| 4 | Difficile |
| 5 | Très difficile |

## Utilisation
Pour accéder à la base de données, il faut installer l'utilitaire `sqlite3`
```bash
sudo apt update -y
sudo apt install sqlite3 -y
```

### Accès aux données
En ligne de commande : 
```bash
sqlite3 ./src/express-webapp/database.db 
```
Avec le navigateur : 
```bash
sqlitebrowser ./src/express-webapp/database.db
```

### Initialisation / Réinitialisation
```bash
./reset-database.sh
```

