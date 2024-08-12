FROM node:18

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port 8080 (par défaut pour une application Vue.js)
EXPOSE 8080

# Démarrer l'application Vue.js
CMD ["npm", "run", "serve"]
