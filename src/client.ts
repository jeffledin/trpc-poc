import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from './router';
import AbortController from 'abort-controller';
import fetch from 'node-fetch';

// polyfill 
// FIXME: any way to avoid doing polyfills?
global.AbortController = AbortController as any;
global.fetch = fetch as any;

async function main() {
  const url = 'http://localhost:3000/trpc';

  const client = createTRPCClient<AppRouter>({
    url,
  });

  const getUserResult = await client.query('users.get', 'foobar');

  console.log(getUserResult);

  const createUserResult = await client.mutation('users.create', {
    name: 'asdf',
    email: 'jeff@codeatlas.io',
  });

  console.log(createUserResult);
}

main();
