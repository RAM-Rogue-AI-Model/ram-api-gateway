import express, { Response, Router } from 'express';

import { ItemController } from '../controllers/ItemController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';

class ItemRouter {
  public router: Router;
  constructor(itemController: ItemController) {
    this.router = express.Router();

    this.router
      .route('/')
      .post(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await itemController.create(req, res);
      });

    this.router
      .route('/:id')
      .delete(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await itemController.delete(req, res);
      })
      .put(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await itemController.delete(req, res);
      })
      .get(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await itemController.findOne(req, res);
      });
  }
}

export { ItemRouter };
