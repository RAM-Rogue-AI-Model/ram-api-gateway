import { Request, Response } from 'express';

import { RegisterUserBody } from '../types/AuthenticateType';
import { CreatePlayerType, PlayerType } from '../types/Player';
import { UserType } from '../types/User';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';
import { RequestWithUser } from '../types/Request';

class PlayerController {
  request;
  constructor() {
    this.request = new Requests(config.MS_PLAYER_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body as Partial<CreatePlayerType>;
      const bodyWithUserId: Partial<CreatePlayerType> = {
        ...body,
        user_id: req.user?.id ?? undefined,
      };
      const data = (await this.request.post(
        '/player',
        JSON.stringify(bodyWithUserId)
      )) as PlayerType;
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id as string;
      const data = (await this.request.delete(
        '/player/' + id
      ));
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { PlayerController };
