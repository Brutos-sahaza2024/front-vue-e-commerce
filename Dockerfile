# Utiliser l'image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Compiler l'application Vue.js
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "run", "serve"]
