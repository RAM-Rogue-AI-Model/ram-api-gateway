import dotenv from 'dotenv';

import { configType } from '../types/config';

dotenv.config();

const config: configType = {
  PORT: Number(process.env.PORT ?? 3001),
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
  MS_USER_URL: process.env.MS_USER_URL ?? 'http://localhost:3002',

  SALT_ROUNDS: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 100,
  JWT_SECRET: process.env.JWT_SECRET ?? 'ram-user-secret-jwt-token',
  INTERNAL_SECRET: process.env.INTERNAL_SECRET ?? 'internal_secret',
};

export { config };
