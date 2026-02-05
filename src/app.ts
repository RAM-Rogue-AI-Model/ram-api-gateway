import fs from 'node:fs';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

import { AuthenticateController } from './controllers/AuthenticateController';
import { BattleController } from './controllers/BattleController';
import { GameController } from './controllers/GameController';
import { ItemController } from './controllers/ItemController';
import { PlayerController } from './controllers/PlayerController';
import { UserController } from './controllers/UserController';
import { AuthenticateRouter } from './routes/AuthenticateRouter';
import { BattleRouter } from './routes/BattleRouter';
import { GameRouter } from './routes/GameRouter';
import { ItemRouter } from './routes/ItemRouter';
import { PlayerRouter } from './routes/PlayerRouter';
import { ShopRouter } from './routes/ShopRouter';
import { UserRouter } from './routes/UserRouter';
import { config } from './utils/config';

const app = express();
const port = config.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: [config.CLIENT_URL],
    credentials: true,
  })
);

const authenticateController = new AuthenticateController();
const userController = new UserController();
const playerController = new PlayerController();
const gameController = new GameController();
const itemController = new ItemController();
const battleController = new BattleController();

app.use('/api', new AuthenticateRouter(authenticateController).router);
app.use('/api/user', new UserRouter(userController).router);
app.use('/api/player', new PlayerRouter(playerController).router);
app.use('/api/game', new GameRouter(gameController).router);
app.use('/api/shop', new ShopRouter(itemController).router);
app.use('/api/item', new ItemRouter(itemController).router);
app.use('/api/battle', new BattleRouter(battleController).router);

const file = fs.readFileSync(path.resolve(__dirname, './openapi.yml'), 'utf8');
const swaggerDocument = YAML.parse(file) as object;
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
