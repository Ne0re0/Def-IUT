# Utiliser une image de base avec Apache et PHP sur Alpine
FROM alpine:latest

# install php and some extensions
RUN apk update && apk add php php-sqlite3 apache2 

# Copier les fichiers de l'application dans le répertoire de l'Apache
COPY ./app/html/ /var/www/html/
COPY ./app/apache-config.conf /etc/apache2/sites-available/000-default.conf
# Ajouter la directive ServerName pour supprimer le message d'avertissement
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf


# Exposer le port 3003
EXPOSE 3003

# Commande pour démarrer Apache
CMD ["httpd", "-D", "FOREGROUND"]
