## Étapes pour exécuter l’application avec Docker

### 1. Build de l’image
Depuis la racine du projet (là où se trouve le `Dockerfile`) :
```
docker build -t <nom_image> .
```

### 2. Lancer le conteneur
Exécuter l’image buildée dans un conteneur:
```
docker run -d -p 3000:80 --name <nom-container> <nom_image>
```