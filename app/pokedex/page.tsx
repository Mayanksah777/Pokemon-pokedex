"use client";

import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useMemo, useState } from "react";

import { PokedexTable } from "@/components/PokedexTable";
import { trpc } from "@/lib/trpc";

function parseNames(input: string): string[] {
  return input
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter((name, index, array) => name.length > 0 && array.indexOf(name) === index);
}

export default function PokedexPage() {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState<string | null>(null);

  const names = useMemo(() => parseNames(submittedInput ?? ""), [submittedInput]);

  const pokemonArrayQuery = trpc.pokemon.getPokemonArray.useQuery(names, {
    enabled: names.length > 0,
    staleTime: 1000 * 60
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (parseNames(input).length === 0) {
      return;
    }
    setSubmittedInput(input);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Multiple Pokemon Fetch</Typography>

      <Box component="form" onSubmit={onSubmit} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Pokemon Names (comma-separated)"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="pikachu, bulbasaur, squirtle"
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ minWidth: 140 }}>
          Fetch
        </Button>
      </Box>

      {pokemonArrayQuery.isLoading && <CircularProgress />}
      {pokemonArrayQuery.isError && <Alert severity="error">Failed to fetch pokemon list.</Alert>}
      {pokemonArrayQuery.data && <PokedexTable pokemonList={pokemonArrayQuery.data} />}
    </Stack>
  );
}
