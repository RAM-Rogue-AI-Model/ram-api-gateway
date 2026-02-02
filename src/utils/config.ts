import dotenv from 'dotenv';

import { configType } from '../types/config';

dotenv.config();

const config: configType = {
  PORT: Number(process.env.PORT ?? 3001),
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
  MS_BATTLE_URL: process.env.MS_BATTLE_URL ?? 'http://localhost:3002',
  MS_EFFECT_URL: process.env.MS_EFFECT_URL ?? 'http://localhost:3003',
  MS_ENEMY_URL: process.env.MS_ENEMY_URL ?? 'http://localhost:3004',
  MS_GAME_URL: process.env.MS_GAME_URL ?? 'http://localhost:3005',
  MS_ITEM_URL: process.env.MS_ITEM_URL ?? 'http://localhost:3006',
  MS_LOGGER_URL: process.env.MS_LOGGER_URL ?? 'http://localhost:3007',
  MS_PLAYER_URL: process.env.MS_PLAYER_URL ?? 'http://localhost:3008',
  MS_USER_URL: process.env.MS_USER_URL ?? 'http://localhost:3009',

  SALT_ROUNDS: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
  JWT_SECRET: process.env.JWT_SECRET ?? 'ram-user-secret-jwt-token',
  INTERNAL_SECRET: process.env.INTERNAL_SECRET ?? 'internal_secret',
};

export { config };
