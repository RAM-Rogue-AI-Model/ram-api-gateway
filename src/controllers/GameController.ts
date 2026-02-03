import { Response } from 'express';

import { CreateGameInput, DungeonType, GameType, UpdateGameInput } from '../types/Game';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';
import { PlayerType } from '../types/Player';

class GameController {
  request;
  playerRequest
  constructor() {
    this.request = new Requests(config.MS_GAME_URL);
    this.playerRequest = new Requests(config.MS_PLAYER_URL);
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

      const data = (await this.request.get(`/game/${id}?playerId=${playerId}`)) as GameType;
      const player = (await this.playerRequest.get(`/player/${playerId}`)) as PlayerType;
      res.json({game:data, player:player});
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async deleteOne(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }
      
      await this.request.delete(`/game/${id}?playerId=${playerId}`)
      res.status(200).send({message:"Game deleted"})
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async getChoices(req:RequestWithUser, res:Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }
      
      const data = await this.request.get(`/game/${id}/dungeon/choice?playerId=${playerId}`)
      res.json(data)
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async chooseDungeon(req:RequestWithUser, res:Response){
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }

      const body = req.body as { type: DungeonType };
      
      const data = await this.request.put(`/game/${id}/dungeon?playerId=${playerId}`, JSON.stringify(body))
      res.json(data)
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async update(req:RequestWithUser, res:Response){
    try{
      const id = req.params.id as string;

      if(!id){
        res.sendStatus(400);
        return
      }

      const body = req.body as UpdateGameInput

      const data = await this.request.patch(`/game/${id}`, JSON.stringify(body))
      res.json(data)
    } catch {
      res.sendStatus(500)
      return
    }
  }
}

export { GameController };
