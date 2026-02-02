interface configType {
  PORT: number;
  CLIENT_URL: string;
  MS_USER_URL: string;
  MS_PLAYER_URL: string;
  MS_GAME_URL: string;
  SALT_ROUNDS: number;
  JWT_SECRET: string;
  INTERNAL_SECRET: string;
}

export { configType };
