import express, { Response, Router } from 'express';

import { BattleController } from '../controllers/BattleController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';

class BattleRouter {
  public router: Router;
  constructor(battleController: BattleController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await battleController.create(req, res);
      });

    this.router.route('/game/:id').get(authenticateJWT, async (req, res) => {
      await battleController.getBattleByGameId(req, res);
    });

    this.router
      .route('/:id')
      .get(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await battleController.get(req, res);
      })
      .delete(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await battleController.delete(req, res);
      });

    this.router
      .route('/:id/action')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await battleController.performAction(req, res);
      });
  }
}

export { BattleRouter };
