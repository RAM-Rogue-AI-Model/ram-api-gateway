import express, { Response, Router } from 'express';

import { GameController } from '../controllers/GameController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';

class GameRouter {
  public router: Router;
  constructor(gameController: GameController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await gameController.create(req, res);
      });
  }
}

export { GameRouter };
