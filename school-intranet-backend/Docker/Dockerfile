# Utiliser une image officielle Node.js comme image de base
FROM node:14

# Créer et définir le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application
CMD [ "node", "index.js" ]
