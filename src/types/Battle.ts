import { ActionsTour } from './Actions';
import { Effect } from './Effect';
import { Enemy } from './Enemy';
import { PlayerType } from './Player';

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
  actions: ActionsTour;
  game_id: string;
  winner: 'player' | 'enemy' | null;
}
