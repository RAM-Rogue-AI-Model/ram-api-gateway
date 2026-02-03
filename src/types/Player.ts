export interface PlayerType {
  id: string;
  name: string;
  pv: number;
  attack: number;
  speed: number;
  user_id: string;
  current_game_id?: string;
}

export interface CreatePlayerType {
  name: string;
  pv: number;
  attack: number;
  speed: number;
  user_id: string;
}
