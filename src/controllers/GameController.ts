import { Response } from 'express';

import { CreateGameInput } from '../types/Game';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class GameController {
  request;
  constructor() {
    this.request = new Requests(config.MS_PLAYER_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body as CreateGameInput;

      const data = await this.request.post('/game', JSON.stringify(body));
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }

      const data = await this.request.get(`/game/${id}?playerId=${playerId}`);
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { GameController };
