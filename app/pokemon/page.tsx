"use client";

import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

import { PokemonRow } from "@/components/PokemonRow";
import { trpc } from "@/lib/trpc";

export default function PokemonPage() {
  const [nameInput, setNameInput] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const pokemonQuery = trpc.pokemon.getPokemon.useQuery(submittedName ?? "", {
    enabled: submittedName !== null,
    staleTime: 1000 * 60
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = nameInput.trim().toLowerCase();
    if (normalized.length === 0) {
      return;
    }
    setSubmittedName(normalized);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Single Pokemon Fetch</Typography>

      <Box component="form" onSubmit={onSubmit} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Pokemon Name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="e.g. pikachu"
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ minWidth: 140 }}>
          Search
        </Button>
      </Box>

      {pokemonQuery.isLoading && <CircularProgress />}
      {pokemonQuery.isError && <Alert severity="error">Pokemon request failed.</Alert>}
      {!pokemonQuery.isLoading && submittedName && pokemonQuery.data === null && (
        <Alert severity="warning">No Pokemon found with name: {submittedName}</Alert>
      )}
      {pokemonQuery.data && <PokemonRow pokemon={pokemonQuery.data} />}
    </Stack>
  );
}
