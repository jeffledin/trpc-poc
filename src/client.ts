import { createTRPCClient } from '@trpc/client';
import AbortController from 'abort-controller';
import fetch from 'node-fetch';
import * as uuid from 'uuid';

import type { AppRouter } from './router';
// polyfill
// FIXME: any way to avoid doing polyfills?
global.AbortController = AbortController as any;
global.fetch = fetch as any;

async function main() {
  const url = 'http://localhost:3000/trpc';

  const userId = uuid.v4();
  const client = createTRPCClient<AppRouter>({
    url,
  });

  const getUserResult = await client.query('users.get', userId);

  console.log(getUserResult);

  const createUserResult = await client.mutation('users.create', {
    name: 'Jeffy',
    email: 'jeff@codeatlas.io',
  });

  console.log(createUserResult);
}

main();
