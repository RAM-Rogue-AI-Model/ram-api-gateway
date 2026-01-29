import express from 'express';
import dotenv from 'dotenv';
import { config } from './utils/config';
import cors from 'cors';
import { UserController } from './controllers/UserController';
import { UserRouter } from './routes/UserRouter';
import { AuthenticateController } from './controllers/AuthenticateController';
import { AuthenticateRouter } from './routes/AuthenticateRouter';

const app = express();
const port = config.PORT || 3001;

app.use(
  cors({
    origin: [config.CLIENT_URL],
    credentials: true,
  })
);

const authenticateController = new AuthenticateController();
const userController = new UserController();

app.use('/api', new AuthenticateRouter(authenticateController).router)
app.use('/api/users', new UserRouter(userController).router)

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
