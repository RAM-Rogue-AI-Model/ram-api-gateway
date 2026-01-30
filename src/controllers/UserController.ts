import { Response } from 'express';

class UserController {
  find(res: Response) {
    res.sendStatus(200);
  }
}

export { UserController };
