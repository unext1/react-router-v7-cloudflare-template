import { drizzle } from 'drizzle-orm/d1';
import { createRequestHandler } from 'react-router';
import * as schema from '../app/db/schema';

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: ReturnType<typeof drizzle>;
  }
}

const requestHandler = createRequestHandler(() => import('virtual:react-router/server-build'), import.meta.env.MODE);

const moreContext = ({ env }: { env: Env }) => {
  const db = drizzle(env.db, { schema });

  return { db };
};

export default {
  async fetch(request, env, ctx) {
    const more = await moreContext({ env });
    return requestHandler(request, {
      cloudflare: { env, ctx },
      ...more,
    });
  },
} satisfies ExportedHandler<Env>;
