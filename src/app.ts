import cors from 'cors';
import express from 'express';

import { AuthenticateController } from './controllers/AuthenticateController';
import { PlayerController } from './controllers/PlayerController';
import { UserController } from './controllers/UserController';
import { AuthenticateRouter } from './routes/AuthenticateRouter';
import { PlayerRouter } from './routes/PlayerRouter';
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

app.use('/api', new AuthenticateRouter(authenticateController).router);
app.use('/api/user', new UserRouter(userController).router);
app.use('/api/player' , new PlayerRouter(playerController).router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
