# Collection Bruno - RAM API Gateway

Cette collection Bruno contient tous les endpoints de l'API Gateway du projet RAM.

## 📋 Prérequis

- [Bruno](https://www.usebruno.com/) installé sur votre machine
- Le serveur API Gateway lancé sur le port 3001

## 🚀 Démarrage rapide

### 1. Lancer le serveur

```bash
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:3001`

### 2. Ouvrir la collection dans Bruno

1. Lancez Bruno
2. Cliquez sur "Open Collection"
3. Sélectionnez le dossier `bruno` dans ce projet

### 3. Workflow de test

1. **Authentification** : Commencez par tester les endpoints d'authentification
   - `Register` : Créer un nouvel utilisateur
   - `Login` : Se connecter (le token JWT sera automatiquement sauvegardé)

2. **Endpoints protégés** : Utilisez les autres endpoints qui nécessitent l'authentification
   - Le token est automatiquement utilisé grâce à la variable `{{token}}`

## 📁 Structure de la collection

```
bruno/
├── bruno.json                  # Configuration de la collection
├── environments/
│   └── Local.bru              # Variables d'environnement (baseUrl, token)
├── Authentication/
│   ├── Register.bru           # POST /api/register
│   └── Login.bru              # POST /api/login (sauvegarde auto du token)
├── User/
│   ├── Get Me.bru             # GET /api/user/me
│   ├── Rename User.bru        # PATCH /api/user/:id/rename
│   ├── Change Password.bru    # PATCH /api/user/:id/password
│   └── Delete User.bru        # DELETE /api/user/:id
├── Player/
│   ├── Create Player.bru      # POST /api/player
│   ├── Get All Players.bru    # GET /api/player
│   ├── Get Player.bru         # GET /api/player/:id
│   ├── Update Player.bru      # PUT /api/player/:id
│   └── Delete Player.bru      # DELETE /api/player/:id
├── Game/
│   └── Create Game.bru        # POST /api/game
├── Item/
│   ├── Create Item.bru        # POST /api/item
│   ├── Get Item.bru           # GET /api/item/:id
│   ├── Update Item.bru        # PUT /api/item/:id
│   └── Delete Item.bru        # DELETE /api/item/:id
└── Shop/
    └── Get Shop Items By Level.bru  # GET /api/shop/:level
```

## 🔑 Authentification

Tous les endpoints (sauf `/register` et `/login`) nécessitent un token JWT valide.

Le token est automatiquement :
- Sauvegardé après un login réussi (grâce au script post-response)
- Utilisé dans les requêtes authentifiées (via `auth:bearer`)

## 📝 Variables d'environnement

Les variables suivantes sont définies dans `environments/Local.bru` :

- `baseUrl` : URL de base de l'API (par défaut : `http://localhost:3001`)
- `token` : Token JWT (rempli automatiquement après login)

## 🛠️ Personnalisation

### Modifier le port

Si votre serveur tourne sur un autre port, modifiez la variable `baseUrl` dans `environments/Local.bru`.

### Modifier les données de test

Vous pouvez modifier les corps de requêtes JSON dans chaque fichier `.bru` selon vos besoins.

## 📊 Endpoints disponibles

### Authentication
- `POST /api/register` - Créer un compte
- `POST /api/login` - Se connecter

### User
- `GET /api/user/me` - Obtenir les infos de l'utilisateur connecté
- `PATCH /api/user/:id/rename` - Renommer un utilisateur
- `PATCH /api/user/:id/password` - Changer le mot de passe
- `DELETE /api/user/:id` - Supprimer un utilisateur

### Player
- `POST /api/player` - Créer un joueur
- `GET /api/player` - Lister tous les joueurs
- `GET /api/player/:id` - Obtenir un joueur
- `PUT /api/player/:id` - Mettre à jour un joueur
- `DELETE /api/player/:id` - Supprimer un joueur

### Game
- `POST /api/game` - Créer une partie

### Item
- `POST /api/item` - Créer un item
- `GET /api/item/:id` - Obtenir un item
- `PUT /api/item/:id` - Mettre à jour un item
- `DELETE /api/item/:id` - Supprimer un item

### Shop
- `GET /api/shop/:level` - Obtenir les items du shop par niveau

## 💡 Astuces

- Les requêtes sont numérotées (seq) pour un ordre logique de test
- Utilisez d'abord les endpoints d'authentification avant de tester les autres
- Les IDs dans les paramètres de path peuvent être modifiés selon vos données
- Chaque fichier `.bru` contient une documentation dans la section `docs`
