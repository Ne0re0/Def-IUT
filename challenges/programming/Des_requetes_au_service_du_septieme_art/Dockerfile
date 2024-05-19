FROM mysql:latest

# Copier le script de création et de remplissage de la base de données Sakila dans le conteneur
COPY sakila-db/sakila-schema.sql /docker-entrypoint-initdb.d/
COPY sakila-db/sakila-data.sql /docker-entrypoint-initdb.d/
COPY sakila-db/init.sql /docker-entrypoint-initdb.d/