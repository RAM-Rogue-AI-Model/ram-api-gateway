import express, { Request, Response, Router } from 'express';

import { LoggerController } from '../controllers/LoggerController';
import { authenticateJWT, requestDetails } from '../utils/auth';

class LoggerRouter {
  public router: Router;
  constructor(loggerController: LoggerController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(
        requestDetails,
        authenticateJWT,
        async (req: Request, res: Response) => {
          await loggerController.getAll(req, res);
        }
      );
  }
}

export { LoggerRouter };
