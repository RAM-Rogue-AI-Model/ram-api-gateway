import { Request, Response } from 'express';

import { RegisterUserBody } from '../types/AuthenticateType';
import { UserType } from '../types/User';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class AuthenticateController {
  request;
  constructor() {
    this.request = new Requests(config.MS_USER_URL);
  }

  async register(req: Request, res: Response) {
    try {
      const body = req.body as Partial<RegisterUserBody>;
      const data = (await this.request.post(
        '/user/register',
        JSON.stringify(body)
      )) as UserType;
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const body = req.body as Partial<RegisterUserBody>;
      const data = (await this.request.post(
        '/user/login',
        JSON.stringify(body)
      )) as UserType;
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { AuthenticateController };
