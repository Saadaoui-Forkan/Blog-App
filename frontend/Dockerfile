# Étape 1 : build de l'app React
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : servir avec nginx
FROM nginx:alpine

# Copie le build React dans nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]