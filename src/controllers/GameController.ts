import { Response } from 'express';

import { BattleError, CreateBattleInputError } from '../types/Battle';
import {
  CreateGameInput,
  DungeonType,
  Game,
  GameConsumablesType,
  GameType,
} from '../types/Game';
import { Item } from '../types/Item';
import { PlayerType } from '../types/Player';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class GameController {
  request;
  playerRequest;
  battleRequest;
  itemRequest;
  constructor() {
    this.request = new Requests(config.MS_GAME_URL);
    this.playerRequest = new Requests(config.MS_PLAYER_URL);
    this.battleRequest = new Requests(config.MS_BATTLE_URL);
    this.itemRequest = new Requests(config.MS_ITEM_URL);
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

      if(data.consumables){
        const dataWithConsumable = {...data, consumables:[]} as GameConsumablesType
        for(const itemId of data.consumables){
          const data = (await this.itemRequest.get(`/item/${itemId}`)) as Item
          if(!dataWithConsumable.consumables) dataWithConsumable.consumables = []
          dataWithConsumable.consumables.push(data)
        }

        res.json({game:dataWithConsumable, player:player}); 
      }else res.json({game:data, player:player}); 

    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async deleteOne(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;
      const pvQuery = req.query.pv as string;
      const attackQuery = req.query.attack as string;
      const speedQuery = req.query.speed as string;
      const force = req.query.force as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }

      if(force === "true"){
        const battleRes = await this.battleRequest.get(`/battle/game/${id}`)
        if(battleRes){
          const data = battleRes as CreateBattleInputError
          if(!data.error && data.id) await this.battleRequest.delete(`/battle/${data.id}`)
        }
        await this.request.delete(`/game/${id}?playerId=${playerId}`)
        res.status(200).send({message:"Game deleted"})
        return
      }else{
        if (!pvQuery || !attackQuery || !speedQuery) {
          res.sendStatus(400);
          return;
        }
        const pv = parseInt(pvQuery);
        const attack = parseInt(attackQuery);
        const speed = parseInt(speedQuery);
        if (isNaN(pv) || isNaN(attack) || isNaN(speed)) {
          res.sendStatus(400);
          return;
        }
        const player = await this.playerRequest.get(`/player/${playerId}`) as PlayerType | null;
        if(!player){
          res.sendStatus(404);
          return;
        }
        const game = await this.request.get(`/game/${id}?playerId=${playerId}`) as Game | null;
        if(!game){
          res.sendStatus(404);
          return;
        }
        const gameStepLength = game.steps.length - 1;
        if (pv + attack + speed > gameStepLength) {
          res.status(400).send({message:"Points exceed the number of steps in the game"});
          return;
        }
  
        player.pv += pv;
        player.attack += attack;
        player.speed += speed;
  
        await this.playerRequest.put(`/player/${playerId}`, JSON.stringify(player)) as PlayerType;
        
        await this.request.delete(`/game/${id}?playerId=${playerId}`)
        res.status(200).send({message:"Game deleted"})
      }

    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async getChoices(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }

      const data = await this.request.get(
        `/game/${id}/dungeon/choice?playerId=${playerId}`
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async chooseDungeon(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const playerId = req.query.playerId as string;

      if (!playerId || !id) {
        res.sendStatus(400);
        return;
      }

      const body = req.body as { type: DungeonType };

      const data = await this.request.put(
        `/game/${id}/dungeon?playerId=${playerId}`,
        JSON.stringify(body)
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async update(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      const input = req.body as { player_id: string; item_id?: string };
      if (!id) {
        res.sendStatus(400);
        return;
      }
      const game = (await this.request.get(
        `/game/${id}?playerId=${input.player_id}`
      )) as Game | null;
      if (!game) {
        res.sendStatus(404);
        return;
      }

      const incompleteStep = game.steps.find((step) => !step.completed);
      if (!incompleteStep) {
        res.sendStatus(404);
        return;
      }

      if (incompleteStep.type === 'DUNGEON') {
        const battle = (await this.battleRequest.get(
          `/battle/game/${game.id}`
        )) as BattleError | null;
        if (!battle) {
          res.sendStatus(404);
          return;
        }

        if (!battle.error) {
          if (battle.winner === 'enemy') {
            game.ended = true;
          }
          await this.battleRequest.delete(`/battle/${battle.id}`);
        }
        game.pv = battle.pv
        game.money += 100
      }else if(incompleteStep.type === "SHOP"){
        if(input.item_id){
          const item = await this.itemRequest.get(`/item/${input.item_id}`) as Item | null;
          if(!item){
            res.sendStatus(404);
            return;
          }
          if(game.money < item.price){
            res.status(400).send({message:"Not enough money"});
            return;
          }
          game.money -= item.price;
          game.consumables.push(item.id);
        }
      }else{
        const player = await this.playerRequest.get(`/player/${input.player_id}`) as PlayerType | null;
        if(!player){
          res.sendStatus(404);
          return;
        }
        game.pv = Math.min(game.pv + 20, player.pv);
      }
      game.completed = true;
      const data = await this.request.patch(
        `/game/${id}`,
        JSON.stringify({ ...game, steps: undefined })
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { GameController };
