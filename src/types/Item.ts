export interface CreateItemInput {
  name: string;
  description: string;
  price: number;
  level_gap: number;
  effect_name: string;
  effect_id: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  level_gap: number;
  effect_name: string;
  effect_id: string;
}