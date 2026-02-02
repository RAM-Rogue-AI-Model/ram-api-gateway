import { GameStep } from './GameStep';

export interface CreateGameInput {
  pv: number;
  playerId: string;
}

export interface Game {
  id: string;
  pv: number;
  consumables: number[]; // Inventory (Int[])
  money: number;
  playerId: string;
  ended: boolean;
  steps: GameStep[];
  createdAt: Date;
  updatedAt: Date;
}
