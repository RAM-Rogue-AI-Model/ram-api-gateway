import { GameStep } from './GameStep';

export interface CreateGameInput {
  pv: number;
  playerId: string;
}

export interface Game {
  id: string;
  pv: number;
  consumables: string[]; // Inventory (Int[])
  money: number;
  playerId: string;
  ended: boolean;
  steps: GameStep[];
  createdAt: Date;
  updatedAt: Date;
  completed?: boolean | null; //FLAG A PASSER A "true" LORSQU'UNE ETAPE EST TERPINÉE
}

export interface GameType {
  id: string;
  pv: number;
  playerId: string;
  consumables?: number[];
  money?: number;
  ended?: boolean;
}

export interface UpdateGameInput {
  pv?: number;
  playerId: string;
  consumables?: number[];
  money?: number;
  ended?: boolean;
  completed?: boolean;
}

export type DungeonType = 'DUNGEON' | 'SHOP' | 'DATACENTER';
