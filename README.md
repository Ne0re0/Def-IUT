# Def-IUT

Cette application a pour but d'héberger des challenges informatiques divers pour les étudiants de l'UBS  
Pour plus d'informations, reportez vous au [cahier des charges](./documents/cahier_des_charges.pdf).

## Installation

1. Installation des packages nécessaires au bon fonctionnement de la conteneurisation
```bash
sudo apt install docker-compose git -y
```
2. Clonage du repertoire
```bash
git clone https://github.com/Ne0re0/Def-IUT.git
cd Def-IUT
```

3. Lancement de la conteneurisation
```bash
sudo docker-compose up --build -d # La première installation peut durer un certain moment en fonction de votre débit
```

4. L'application est lancée sur le port localhost:3000 http://localhost:3000