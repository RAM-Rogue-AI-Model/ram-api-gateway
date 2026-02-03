import { Effect } from './Effect';
import { Enemy } from './Enemy';
import { PlayerType } from './Player';
import { Actions } from './Actions';

export interface CreateBattleInput {
  enemy: Enemy[];
  effect: Effect[];
  player: PlayerType;
  pv: number;
  level_dungeon: number;
  game_id: string;
}

export interface Battle {
  id: string;
  enemy: Enemy[];
  effect: Effect[];
  player: PlayerType;
  pv: number;
  level_dungeon: number;
  actions: Actions;
  game_id: string;
  winner: 'player' | 'enemy' | null;
}
