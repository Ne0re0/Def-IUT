# Utiliser une image de base avec Apache et PHP sur Alpine
FROM ubuntu

# Mettre à jour les paquets et installer les logiciels nécessaires
RUN apt-get update > /dev/null
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install apache2 php libapache2-mod-php sqlite3 php-sqlite3 > /dev/null


# Copier les fichiers de l'application dans le répertoire de l'Apache
COPY ./app/html/ /var/www/html/
COPY ./app/apache-config.conf /etc/apache2/sites-available/000-default.conf

RUN rm /var/www/html/index.html

# Exposer le port 30003
EXPOSE 80

# Commande pour démarrer Apache
CMD service apache2 start && tail -f /dev/null
