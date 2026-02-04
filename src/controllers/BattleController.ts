import { Response } from 'express';

import { Action } from '../types/Action';
import { Battle, CreateBattleInput, CreateBattleInputError } from '../types/Battle';
import { Enemy } from '../types/Enemy';
import { Game } from '../types/Game';
import { PlayerType } from '../types/Player';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';
import { Item } from '../types/Item';
import { Effect } from '../types/Effect';

class BattleController {
  request;
  request_game;
  request_player;
  request_enemy;
  request_item;
  request_effect;
  constructor() {
    this.request = new Requests(config.MS_BATTLE_URL);
    this.request_game = new Requests(config.MS_GAME_URL);
    this.request_player = new Requests(config.MS_PLAYER_URL);
    this.request_enemy = new Requests(config.MS_ENEMY_URL);
    this.request_item = new Requests(config.MS_ITEM_URL);
    this.request_effect = new Requests(config.MS_EFFECT_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body as { game_id: string, player_id:string};
      const game: Game = await this.request_game.get(`/game/${body.game_id}?playerId=${body.player_id}`) as Game;
      const player : PlayerType = await this.request_player.get(`/player/${game.playerId}`) as PlayerType;
      const step = game.steps.length;
      const enemyCount = Math.floor(step / 10) + 1;
      const enemies = await this.request_enemy.get(`/enemy?random=true&limit=${enemyCount}`) as Enemy[];

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
      const battle = await this.request.get(
        `/battle/${battleId}`
      ) as Battle | null;
      if(!battle){
        res.sendStatus(404).json({ error: 'BATTLE Not Found' });
        return;
      }
      if(actionBody.type === 'item' && actionBody.item_id) {
        const item = await this.request_item.get(`/item/${actionBody.item_id}`) as Item | null;
        if(!item){
          res.sendStatus(404).json({ error: 'ITEM Not Found' });
          return;
        }
        const effect = await this.request_effect.get(`/effect/${item.effect_id}`) as Effect | null;
        if(!effect){
          res.sendStatus(404).json({ error: 'EFFECT ITEM Not Found' });
          return;
        }
          battle.effect.push(effect);

        await this.request.put('/battle', JSON.stringify(battle));
      }

      const data = await this.request.put(
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

      const data = (await this.request.get(
        `/battle/game/${gameId}`
      )) as CreateBattleInputError;

      if(data.error){
        res.json({data:null, exist:false})
        return
      }else {
        res.json({...data, exist:true});
        return
      }
    } catch {
      res.sendStatus(500);
      return
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
