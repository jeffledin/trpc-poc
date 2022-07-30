import * as trpc from '@trpc/server';
import { z } from 'zod';

// TODO: change this to `user.get` style
const usersRouter = trpc
  .router()
  .query('get', {
    input: z.string(),
    resolve: async (req) => {
      return { id: req.input, message: 'hello world' };
    },
  })
  .mutation('create', {
    input: z.object({
      email: z.string().min(5),
      name: z.string(),
    }),
    resolve: (req) => {
      if (!req.input.name) {
        throw new Error('rip!');
      }
      return req.input;
    },
  });

export const appRouter = trpc.router().merge('users.', usersRouter);

export type AppRouter = typeof appRouter;
