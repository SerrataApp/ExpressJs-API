# API Serrata Express.js
### Prérequis

- Avoir **Docker** d'installé sur la machine

**ou** (version gelère)

- Avoir `npm` et `npx` d'installé sur la machine
- Avoir **postgresql** d'installé sur la machine

### Installation

> [!WARNING]
> Pour plus de symplicité la SECRET_KEY pour la signature des token jwt est en clair veuillez la changer pour une utilisation plus sécurisée

### Version simple

```
git clone https://github.com/SerrataApp/ExpressJs-API.git api_serrata
cd api_serrata
docker-compose up -d
```

Ensuite il faut aller dans la console du docker de l'api Express.js et executer la commande `npx primsa migrate dev`

### Version galère

```
git clone https://github.com/SerrataApp/ExpressJs-API.git api_serrata
cd api_serrata
npm install
```

Initialisez un fichier d'environnement `.env` et entrez les valeurs suivantes : 
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?KEY1=VALUE"
PORT=3000 (par défaut 3000 si aucune valeur n'est précisé)
SECRET_KEY=""
```
Remplacez les valeurs à changer dans DATABASE_URL, pour ce qui est de SECRET_KEY ouvrez un terminal bash et rentrez la commande `openssl rand -hex 32` ou toute autre commande permettant de générer une clef.

Faire `npx prisma generate`
Puis `npx prisma migrate dev`

Lancez le projet avec [bun](https://bun.sh/) à la racine du projet
`bun --hot src/app.ts`





