# Utilise une image Node officielle
FROM node:18

# Définit le répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du projet
COPY . .

# Expose le port utilisé par Express
EXPOSE 8000

# Démarre l'application
CMD ["npm", "run", "dev"]