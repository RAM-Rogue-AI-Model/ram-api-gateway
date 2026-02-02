import express, { Response, Router } from 'express';

import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';
import { BattleController } from '../controllers/BattleController';

class BattleRouter {
  public router: Router;
  constructor(battleController: BattleController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await battleController.create(req, res);
      });
  }
}

export { BattleRouter };
