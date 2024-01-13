# Challenge configuration file

Dans ce dossier `conf/` se trouvent les fichiers : 
- `challenges.yml` qui contient les challenges de l'application
- `update-db.sh` qui doit être exécuté pour mettre a jour la base de données
- `README.md` ce fichier
Toutes la gestion des challenges passe au travers du fichier `challenges.yml`

## Modification de `challenges.yml`
Chaque challenge prends la forme suivante :
```yml
# Le titre du challenge
- title: "Premier challenge"
  # La catégorie du challenge (Programmation, Reverse, Web,...)
  # Accepte des chaines de caractères
  category: "Reverse"
  # La difficulté du challenge
  # Accepte des entiers entre 1 et 5 inclus.
  # 1 est la difficulté la plus basse
  # 5 est la difficulté la plus haute
  difficulty: 4
  # La description du challenge
  # Accepte une chaine de caractères
  description: "The best description"
  # Le flag de validation pour le challenge
  # Accepte une chaine de caractères
  flag: "p@$$w0rd"
  # Cet attribut donne des informations sur la connexion au challenge
  # Accepte une chaine de caractères
  # Cet attribut peut être commenté s'il n'est pas nécessaire
  connection: "http://example.com/"
```

Pour ajouter un challenge il suffit de l'ajouter à la fin du fichier
```yml
- title: "Premier challenge"
  category: "Reverse"
  difficulty: 4
  description: "The best description"
  flag: "p@$$w0rd"
  # connection: "http://example.com/"

- title: "Deuxième challenge"
  category: "Programmation"
  difficulty: 2
  description: "Ceci est une description"
  flag: "DEFIUT{flag_de_validation}"
  connection: "ssh carl@defiut.fr -p 2222"
```

### A savoir
Lorsqu'un challenge de la base de données possédant le même titre qu'un challenge du fichier est trouvé : 
- Si le challenge est identique, rien ne se passe
- Si certaines valeurs sont différentes, le script demande à l'utilisateur s'il souhaite mettre à jour la base de données.
Attention, si vous changez le titre d'un challenge, il sera considéré comme un nouveau challenge à part entière

### Application des modifications

```bash
./update-db.sh 
```

**PS** : Il est possible d'insérer un challenge, de modifier un challenge existant mais il n'est pas possible de supprimer un challenge.