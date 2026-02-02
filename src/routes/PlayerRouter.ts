import express, { Response, Router } from 'express';

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
      })
      .get(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.findAll(req, res);
      });

    this.router
      .route('/:id')
      .delete(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.delete(req, res);
      })
      .put(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.delete(req, res);
      })
      .get(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await playerController.findOne(req, res);
      });
  }
}

export { PlayerRouter };
