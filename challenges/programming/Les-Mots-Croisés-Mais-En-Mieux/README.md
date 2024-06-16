
### 1. Construire et lancer les conteneurs
Naviguez vers le répertoire de votre projet et exécutez les commandes suivantes :

docker-compose build
docker-compose up -d
Ces commandes vont construire l'image Docker et démarrer les conteneurs en arrière-plan.

### 2. Arrêter les conteneurs
Pour arrêter les conteneurs, utilisez la commande suivante :

docker-compose down

### 3. Se connecter à l'application
Accéder à l'application
Pour accéder à l'application, utilisez une connexion tcp via un langage de programmation : tcp://localhost:30002

### 4. Structure de l'application
Votre application devrait avoir la structure suivante :

├── Dockerfile
├── README.md
├── docker-compose.yml
├── solve.py
├── src
│   ├── app.py
│   ├── solve.py
│   └── words.txt
└── start

