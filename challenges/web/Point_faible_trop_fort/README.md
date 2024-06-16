
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
Ouvrez votre navigateur web et accédez à http://localhost:30003. Vous devriez voir l'index de votre application web.

### 4 . Structure de l'application
Votre application devrait avoir la structure suivante :

├── Dockerfile
├── app
│   ├── CreateDB_script.sql
│   ├── apache-config.conf
│   └── html
│       ├── index.php
│       ├── login
│       │   ├── index.php
│       │   └── sqlite.db
│       └── style.css
└── docker-compose.yml
