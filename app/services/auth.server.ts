import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type * as schema from '../db/schema';

export const authOptions = {
  emailAndPassword: {
    enabled: true,
  },
  plugins: [],
} satisfies BetterAuthOptions;

export const createAuth = (db: DrizzleD1Database<typeof schema>) => {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
    }),
    ...authOptions,
  });
};

export type Auth = ReturnType<typeof createAuth>;
