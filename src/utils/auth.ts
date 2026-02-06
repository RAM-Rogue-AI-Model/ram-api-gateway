import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { RequestWithUser } from '../types/Request';
import { config } from './config';

const authenticateJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const SECRET_KEY = config.JWT_SECRET;

  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (!user || typeof user === 'string' || error) {
        res.sendStatus(403);
        return;
      }

      req.user = {
        id: user.id as string,
        username: user.username as string,
        isAdmin: user.isAdmin as boolean,
      };
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const requestDetails = (
  req: Request | RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const today = new Date();
  // eslint-disable-next-line no-console
  console.log(
    req.method +
      ' - ' +
      req.baseUrl +
      ' - ' +
      req.url +
      ' - ' +
      today.toLocaleString()
  );
  next();
};

export { authenticateJWT, requestDetails };
