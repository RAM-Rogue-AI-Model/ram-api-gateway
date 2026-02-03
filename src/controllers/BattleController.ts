import { Response } from 'express';

import { Action } from '../types/Action';
import { CreateBattleInput } from '../types/Battle';
import { Enemy } from '../types/Enemy';
import { Game } from '../types/Game';
import { PlayerType } from '../types/Player';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class BattleController {
  request;
  request_game;
  request_player;
  request_enemy;
  constructor() {
    this.request = new Requests(config.MS_BATTLE_URL);
    this.request_game = new Requests(config.MS_GAME_URL);
    this.request_player = new Requests(config.MS_PLAYER_URL);
    this.request_enemy = new Requests(config.MS_ENEMY_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body as { game_id: string};
      const game: Game = await this.request_game.get(`/game/${body.game_id}`) as Game;
      const player : PlayerType = await this.request_player.get(`/user/${game.playerId}`) as PlayerType;
      const step = game.steps.length;
      const enemyCount = Math.floor(step / 10) + 1;
      const enemies = await this.request_enemy.get(`enemy?random=true&limit=${enemyCount}`) as Enemy[];

      const battleBody: CreateBattleInput = {
        effect: [],
        enemy: enemies,
        game_id: game.id,
        level_dungeon: 0,
        player: player,
        pv: player.pv,
      };


      const data = await this.request.post(
        '/battle',
        JSON.stringify(battleBody)
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async performAction(req: RequestWithUser, res: Response) {
    try {
      const battleId = req.params.id as string;
      const actionBody = req.body as Action;

      const data = await this.request.post(
        `/battle/${battleId}/action`,
        JSON.stringify(actionBody)
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
    }
  }

  async get(req: RequestWithUser, res: Response) {
    try {
      const battleId = req.params.id as string;

      const data = await this.request.get(
        `/battle/${battleId}`
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
    }
  }

  async getBattleByGameId(req: RequestWithUser, res: Response) {
    try {
      const gameId = req.params.id as string;

      const data = await this.request.get(
        `/battle/game/${gameId}`
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    try {
      const battleId = req.params.id as string;

      await this.request.delete(
        `/battle/${battleId}`
      );
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  }

}

export { BattleController };
