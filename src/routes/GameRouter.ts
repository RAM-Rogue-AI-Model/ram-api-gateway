import express, { Response, Router } from 'express';

import { GameController } from '../controllers/GameController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT, requestDetails } from '../utils/auth';

class GameRouter {
  public router: Router;
  constructor(gameController: GameController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.create(req, res);
        }
      );

    this.router
      .route('/:id')
      .get(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.findOne(req, res);
        }
      )
      .patch(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.update(req, res);
        }
      )
      .delete(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.deleteOne(req, res);
        }
      );

    this.router
      .route('/:id/choices')
      .get(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.getChoices(req, res);
        }
      );

    this.router
      .route('/:id/dungeon')
      .put(
        requestDetails,
        authenticateJWT,
        async (req: RequestWithUser, res: Response) => {
          await gameController.chooseDungeon(req, res);
        }
      );
  }
}

export { GameRouter };
