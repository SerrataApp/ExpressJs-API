# API Serrata Express.js
### Prérequis

- Avoir `npm` et `npx` d'installer sur la machine
- Avoir **postgresql** d'installer sur la machine

### Installation

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

(il y a peut etre des commandes a faire pour initialiser la bd avec prisma si c'est le cas faites `npx prisma migrate dev`)

Lancez le projet avec [bun](https://bun.sh/) à la racine du projet
`bun --hot src/app.ts`





