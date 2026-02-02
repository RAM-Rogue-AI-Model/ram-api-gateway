import express, { Response, Router } from 'express';

import { UserController } from '../controllers/UserController';
import { RequestWithUser } from '../types/Request';
import { authenticateJWT, requestDetails } from '../utils/auth';

class UserRouter {
  public router: Router;
  constructor(_userController: UserController) {
    this.router = express.Router();

    this.router
      .route('/me')
      .get(
        requestDetails,
        authenticateJWT,
        (req: RequestWithUser, res: Response) => res.json(req.user)
      );

    this.router
      .route('/:id/rename')
      .patch(
        requestDetails,
        authenticateJWT,
        (req: RequestWithUser, res: Response) =>
          _userController.rename(req, res)
      );

    this.router
      .route('/:id/password')
      .patch(
        requestDetails,
        authenticateJWT,
        (req: RequestWithUser, res: Response) =>
          _userController.changePassword(req, res)
      );

    this.router
      .route('/:id')
      .delete(
        requestDetails,
        authenticateJWT,
        (req: RequestWithUser, res: Response) =>
          _userController.delete(req, res)
      );
  }
}

export { UserRouter };
