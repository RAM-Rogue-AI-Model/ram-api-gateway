interface configType {
  PORT: number;
  CLIENT_URL: string;
  MS_BATTLE_URL: string;
  MS_EFFECT_URL: string;
  MS_ENEMY_URL: string;
  MS_GAME_URL: string;
  MS_ITEM_URL: string;
  MS_LOGGER_URL: string;
  MS_PLAYER_URL: string;
  MS_USER_URL: string;
  SALT_ROUNDS: number;
  JWT_SECRET: string;
  INTERNAL_SECRET: string;
}

export { configType };
