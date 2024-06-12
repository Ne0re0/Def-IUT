FROM ubuntu:latest

# Mettre à jour les paquets et installer MySQL
RUN apt-get update && apt-get install -y mysql-server wget unzip

# Télécharger et installer la base de données Sakila
RUN wget https://downloads.mysql.com/docs/sakila-db.zip && \
    unzip sakila-db.zip && \
    mv sakila-db/sakila-schema.sql /sakila-schema.sql && \
    mv sakila-db/sakila-data.sql /sakila-data.sql

# Configurer MySQL
RUN service mysql start && \
    mysql -e "CREATE DATABASE sakila;" && \
    mysql sakila < /sakila-schema.sql && \
    mysql sakila < /sakila-data.sql && \
    mysql -e "CREATE USER 'user'@'%' IDENTIFIED BY 'user';" && \
    mysql -e "GRANT SELECT ON *.* TO 'user'@'%';" && \
    mysql -e "FLUSH PRIVILEGES;"

# Configurer MySQL pour accepter les connexions externes
RUN sed -i "s/bind-address\s*=.*$/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

# Exposer le port MySQL
EXPOSE 3306

# Démarrer le service MySQL
CMD ["mysqld"]
