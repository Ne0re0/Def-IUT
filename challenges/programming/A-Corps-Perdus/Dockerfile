FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

# Copier les fichiers de configuration Apache dans le conteneur

COPY ./src/ /app

WORKDIR /app
# Exposer le port 80 pour le serveur web
EXPOSE 5000

# Démarrer les services Apache et MySQL lorsque le conteneur est lancé
CMD flask run
