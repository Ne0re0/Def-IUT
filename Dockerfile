# Utilisez une image Node.js comme base
FROM node:14


RUN apt-get update --fix-missing
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install sudo sqlite3 apt-utils


# Créez le répertoire de travail dans l'image
WORKDIR /app

# Copiez le reste des fichiers de l'application dans le répertoire de travail
COPY ./conf/ ./conf/
COPY ./documents/ ./documents/
COPY ./log/ ./log/
COPY ./src/ ./src/
COPY ./src/database/ ./src/database/
COPY ./src/emails_check/ ./src/emails_check/
COPY ./src/password_recovery/ ./src/password_recovery/


COPY ./src/express_webapp/ ./src/express_webapp/
COPY ./src/express_webapp/bin/ ./src/express_webapp/bin/
COPY ./src/express_webapp/def-iut-database/ ./src/express_webapp/def-iut-database/
COPY ./src/express_webapp/package.json ./src/express_webapp/package.json
COPY ./src/express_webapp/package-lock.json ./src/express_webapp/package-lock.json
COPY ./src/express_webapp/routes/ ./src/express_webapp/routes/
COPY ./src/express_webapp/routes/middlewares/ ./src/express_webapp/routes/middlewares/
COPY ./src/express_webapp/app.js ./src/express_webapp/app.js
COPY ./src/express_webapp/public/ ./src/express_webapp/public/
COPY ./src/express_webapp/public/badges/ ./src/express_webapp/public/badges/
COPY ./src/express_webapp/public/challenges/ ./src/express_webapp/public/challenges/
COPY ./src/express_webapp/public/images/ ./src/express_webapp/public/images/
COPY ./src/express_webapp/public/javascripts/ ./src/express_webapp/public/javascripts/
COPY ./src/express_webapp/public/stylesheets/ ./src/express_webapp/public/stylesheets/
# Copy of font-awesome
COPY ./src/express_webapp/views/ ./src/express_webapp/views/
COPY ./src/express_webapp/database.db ./src/express_webapp/database.db

COPY ./install-libraries .
COPY ./reset-database .
COPY ./start .
COPY ./stop .
COPY ./update-challenges .

# Installez les dépendances
RUN ./install-libraries > /dev/null
RUN ./reset-database

# Create a user in order to not run the applicaion as sudo
RUN useradd -m -s /bin/bash defiut && echo "defiut:defiut" | chpasswd
# Give him sudo rights
RUN usermod -aG sudo defiut
# Switch to user defiut
USER defiut

WORKDIR /app/src/express_webapp

# Exposez le port sur lequel le serveur Express écoutera
EXPOSE 3000

# Commande pour démarrer l'application lorsque le conteneur démarre
CMD ["npm", "start"]
