import express, { Request, Response, Router } from 'express';

import { AuthenticateController } from '../controllers/AuthenticateController';
import { requestDetails } from '../utils/auth';

class AuthenticateRouter {
  public router: Router;
  constructor(authenticateController: AuthenticateController) {
    this.router = express.Router();

    this.router
      .route('/register')
      .get(requestDetails, async (req: Request, res: Response) => {
        await authenticateController.register(req, res);
      });

    this.router.route('/login').post((req: Request, res: Response) => {
      res.sendStatus(200);
    });
  }
}

export { AuthenticateRouter };
