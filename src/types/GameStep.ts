import { DUNGEON } from './Dungeon';

export interface GameStep {
  id: string;
  type: DUNGEON;
  completed: boolean;
  date_add: Date;
  game_id: string;
}
