## Docker Instructions - Backend

### 1️⃣ Build de l'image Docker
Depuis le dossier `backend`, exécute la commande suivante pour créer l'image Docker: 
```
docker build -t blog-backend:1.1.0 .
```
* -t blog-backend:1.1.0 → nom et tag de l'image
* . → indique que le Dockerfile se trouve dans le dossier courant

### 2️⃣ Lancer le conteneur Docker
Pour démarrer un conteneur avec les variables d'environnement et un nom explicite:
```
docker run -d -p 5000:8000 --env-file .env --name blog-backend-container blog-backend:1.1.0
```
* -d → mode détaché (en arrière-plan)

* -p 5000:8000 → mappe le port 8000 du conteneur vers le port 5000 de la machine hôte

* --env-file .env → charge les variables d'environnement depuis le fichier .env

* --name blog-backend-container → nom explicite du conteneur