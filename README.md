# API Serrata Express.js
*Api du site [Serrata](https://serrata.super-sympa.fr/)*
## Installation

```
git clone https://github.com/SerrataApp/ExpressJs-API.git api_serrata
cd api_serrata
```

Faire un fichier `.env` avec les valeurs suivantes à l'interieur.
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000 (par défaut 3000 si aucune valeur n'est précisé)
SECRET_KEY=""
```
Remplacez les valeurs à changer dans **DATABASE_URL**, pour ce qui est de SECRET_KEY ouvrez un terminal bash et rentrez la commande `openssl rand -hex 32` ou toute autre commande permettant de générer une clef.

> [!WARNING]
> Attention à ne pas partager ce fichier d'environnement

### Docker
#### Prérequis

Avoir `docker` ainsi que `docker-compose` d'installé sur sa machine.

Ensuite utilisez cette valeur pour **DATABASE_URL** : `postgresql://postgres:postgres@localhost:2345/mydb?schema=public`

```
docker-compose up -d
```

### Node
#### Prérequis

- Avoir `node` d'installé sur la machine
- Avoir **postgresql** d'installé sur la machine

Confiurez votre base de donnée en mettant les bonnes valeurs dans le `.env` pour le champ **DATABASE_URL**

Pour utiliser l'api en mode développement
```
npm run dev
```

Pour utiliser l'api en mode production
```
npm run build
npm run prod
```
