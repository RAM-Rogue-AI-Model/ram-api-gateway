import { Actions } from './Actions';
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
