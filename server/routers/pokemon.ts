import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import type { PaginatedPokemonDto, PokemonDto } from "@/types/pokemon";

const paginationInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(5)
});

function mapPokemon(pokemon: {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}): PokemonDto {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    sprite: pokemon.sprite
  };
}

export const pokemonRouter = createTRPCRouter({
  createPokemon: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        types: z.array(z.string().min(1)).min(1),
        sprite: z.string().url()
      })
    )
    .mutation(async ({ input }) => {
      const normalizedName = input.name.trim().toLowerCase();
      const normalizedTypes = input.types.map((type) => type.trim().toLowerCase());

      const existingPokemon = await prisma.pokemon.findUnique({
        where: {
          name: normalizedName
        }
      });

      if (existingPokemon) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Pokemon "${normalizedName}" already exists.`
        });
      }

      const createdPokemon = await prisma.pokemon.create({
        data: {
          name: normalizedName,
          types: normalizedTypes,
          sprite: input.sprite.trim()
        }
      });

      return mapPokemon(createdPokemon);
    }),

  getPokemon: publicProcedure.input(z.string().min(1)).query(async ({ input }) => {
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        name: input.trim().toLowerCase()
      }
    });

    if (!pokemon) {
      return null;
    }

    return mapPokemon(pokemon);
  }),

  getPokemonArray: publicProcedure.input(z.array(z.string().min(1)).min(1)).query(async ({ input }) => {
    const names = input.map((name) => name.trim().toLowerCase());
    const pokemonList = await prisma.pokemon.findMany({
      where: {
        name: {
          in: names
        }
      },
      orderBy: {
        id: "asc"
      }
    });

    return pokemonList.map(mapPokemon);
  }),

  getAllPokemon: publicProcedure.input(paginationInputSchema).query(async ({ input }) => {
    // Generic paginated list endpoint used by clients that need full dataset browsing.
    const skip = (input.page - 1) * input.limit;

    const [items, totalCount] = await Promise.all([
      prisma.pokemon.findMany({
        orderBy: { id: "asc" },
        skip,
        take: input.limit
      }),
      prisma.pokemon.count()
    ]);

    const response: PaginatedPokemonDto = {
      items: items.map(mapPokemon),
      totalCount,
      totalPages: Math.max(1, Math.ceil(totalCount / input.limit)),
      page: input.page,
      limit: input.limit
    };

    return response;
  }),

  getPokemonByType: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(50).default(5)
      })
    )
    .query(async ({ input }) => {
      const skip = (input.page - 1) * input.limit;
      const normalizedType = input.type?.trim().toLowerCase();

      // If no type is selected, query all Pokemon with the same pagination path.
      const whereClause = normalizedType
        ? {
            types: {
              has: normalizedType
            }
          }
        : undefined;

      const [items, totalCount] = await Promise.all([
        prisma.pokemon.findMany({
          where: whereClause,
          orderBy: { id: "asc" },
          skip,
          take: input.limit
        }),
        prisma.pokemon.count({
          where: whereClause
        })
      ]);

      const response: PaginatedPokemonDto = {
        items: items.map(mapPokemon),
        totalCount,
        totalPages: Math.max(1, Math.ceil(totalCount / input.limit)),
        page: input.page,
        limit: input.limit
      };

      return response;
    }),

  getPokemonTypes: publicProcedure.query(async () => {
    const allTypesRows = await prisma.pokemon.findMany({
      select: {
        types: true
      }
    });

    const typeSet = new Set<string>();

    for (const row of allTypesRows) {
      for (const type of row.types) {
        typeSet.add(type.toLowerCase());
      }
    }

    return Array.from(typeSet).sort((a, b) => a.localeCompare(b));
  })
});
