# Étape 1: Build stage
FROM node:14 AS build

# Créer et définir le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Étape 2: Production stage
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
