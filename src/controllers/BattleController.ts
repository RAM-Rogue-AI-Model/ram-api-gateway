import { Response } from 'express';

import { CreateGameInput } from '../types/Game';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class BattleController {
  request;
  constructor() {
    this.request = new Requests(config.MS_PLAYER_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body;

      const data = await this.request.post('/battle', JSON.stringify(body));
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

}

export { BattleController };
