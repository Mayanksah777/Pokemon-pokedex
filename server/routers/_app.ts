import { createTRPCRouter } from "@/server/trpc";
import { pokemonRouter } from "@/server/routers/pokemon";

export const appRouter = createTRPCRouter({
  pokemon: pokemonRouter
});

export type AppRouter = typeof appRouter;
