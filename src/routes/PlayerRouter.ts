import express, { Request, Response, Router } from 'express';

import { PlayerController } from '../controllers/PlayerController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';

class PlayerRouter {
  public router: Router;
  constructor(playerController: PlayerController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.create(req, res);
      });

    this.router
      .route('/:id')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.delete(req, res);
      });
  }
}

export { PlayerRouter };