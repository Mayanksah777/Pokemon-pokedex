"use client";

import { Alert, Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { PokedexTable } from "@/components/PokedexTable";
import { PokemonTypeSelection } from "@/components/PokemonTypeSelection";
import { trpc } from "@/lib/trpc";

const PAGE_SIZE = 5;

export function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const typesQuery = trpc.pokemon.getPokemonTypes.useQuery(undefined, {
    staleTime: 1000 * 60 * 10
  });

  const pokemonQuery = trpc.pokemon.getPokemonByType.useQuery(
    { type: selectedType, page, limit: PAGE_SIZE },
    {
      staleTime: 1000 * 60
    }
  );

  const onSelectType = (type: string | undefined) => {
    setSelectedType(type);
    setPage(1);
  };

  return (
    <Stack spacing={3}>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={onSelectType}
        types={typesQuery.data ?? []}
      />

      {pokemonQuery.isError ? (
        <Alert severity="error">Failed to load Pokemon for this filter.</Alert>
      ) : (
        <PokedexTable pokemonList={pokemonQuery.data?.items ?? []} />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography color="text.secondary">
          Total: {pokemonQuery.data?.totalCount ?? 0} pokemon
        </Typography>
        <Pagination
          count={pokemonQuery.data?.totalPages ?? 1}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Stack>
  );
}
