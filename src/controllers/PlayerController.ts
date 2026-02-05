import { Response } from 'express';

import { GameType } from '../types/Game';
import { CreatePlayerType, PlayerType } from '../types/Player';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class PlayerController {
  request;
  gameRequest;
  constructor() {
    this.request = new Requests(config.MS_PLAYER_URL);
    this.gameRequest = new Requests(config.MS_GAME_URL);
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

  async delete(req: RequestWithUser, res: Response) {
    try {
      const id: string = req.params.id as string;
      await this.request.delete('/player/' + id);
      res.sendStatus(200);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: RequestWithUser, res: Response) {
    try {
      const id: string = req.params.id as string;
      const userId: string | undefined = req.user?.id ?? undefined;

      if (!userId || !id) {
        res.sendStatus(400);
        return;
      }

      const data = await this.request.delete(`/player/${id}?user_id=${userId}`);
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async findAll(req: RequestWithUser, res: Response) {
    try {
      const userId: string | undefined = req.user?.id ?? undefined;

      const data = (await this.request.get(
        `/player?user_id=${userId}`
      )) as PlayerType[];
      const players: PlayerType[] = [];
      for (const p of data) {
        const player = { ...p };
        const games = (await this.gameRequest.get(`/game?playerId=${p.id}`)) as
          | GameType[]
          | undefined;
        if (games && games.length > 0) {
          const game = games.find((g) => !g.ended);
          if (game) player.current_game_id = game.id;
        }
        players.push(player);
      }
      res.json(players);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async update(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const data = await this.request.put(
        `/player/${id}`,
        JSON.stringify(req.body)
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { PlayerController };
