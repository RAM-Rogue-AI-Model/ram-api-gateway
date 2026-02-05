import express, { Response, Router } from 'express';

import { ItemController } from '../controllers/ItemController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT } from '../utils/auth';

class ShopRouter {
  public router: Router;
  constructor(itemController: ItemController) {
    this.router = express.Router();

    this.router
      .route('/:level')
      .get(authenticateJWT, async (req: RequestWithUser, res: Response) => {
        await itemController.findAll(req, res);
      });
  }
}

export { ShopRouter };
