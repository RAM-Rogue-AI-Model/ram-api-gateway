import express, { Request, Response, Router } from 'express';

import { UserController } from '../controllers/UserController';

class UserRouter {
  public router: Router;
  constructor(_userController: UserController) {
    this.router = express.Router();

    this.router.route('/').get((_req: Request, res: Response) => {
      res.sendStatus(200);
    });
  }
}

export { UserRouter };
