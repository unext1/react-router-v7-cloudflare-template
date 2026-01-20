import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { authOptions } from './app/services/auth.server';

export const auth = betterAuth({
  database: drizzleAdapter({} as D1Database, {
    provider: 'sqlite',
  }),
  ...authOptions,
});

export default auth;
