"use client";

import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { type FormEvent, useMemo, useState } from "react";

import { PokemonRow } from "@/components/PokemonRow";
import { trpc } from "@/lib/trpc";

function parseTypes(input: string): string[] {
  return input
    .split(",")
    .map((type) => type.trim().toLowerCase())
    .filter((type, index, array) => type.length > 0 && array.indexOf(type) === index);
}

export default function AddPokemonPage() {
  const utils = trpc.useUtils();

  const [name, setName] = useState("");
  const [typesInput, setTypesInput] = useState("");
  const [sprite, setSprite] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const parsedTypes = useMemo(() => parseTypes(typesInput), [typesInput]);

  const createPokemonMutation = trpc.pokemon.createPokemon.useMutation({
    onSuccess: async () => {
      setName("");
      setTypesInput("");
      setSprite("");
      setValidationError(null);
      await Promise.all([
        utils.pokemon.getPokemonTypes.invalidate(),
        utils.pokemon.getAllPokemon.invalidate(),
        utils.pokemon.getPokemonByType.invalidate()
      ]);
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length === 0) {
      setValidationError("Name is required.");
      return;
    }

    if (parsedTypes.length === 0) {
      setValidationError("Provide at least one type.");
      return;
    }

    try {
      new URL(sprite.trim());
    } catch {
      setValidationError("Sprite must be a valid URL.");
      return;
    }

    setValidationError(null);
    createPokemonMutation.mutate({
      name,
      types: parsedTypes,
      sprite
    });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Add Pokemon</Typography>

      <Box component="form" onSubmit={onSubmit} display="grid" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. eevee"
          fullWidth
        />
        <TextField
          label="Types (comma-separated)"
          value={typesInput}
          onChange={(event) => setTypesInput(event.target.value)}
          placeholder="normal, fairy"
          fullWidth
        />
        <TextField
          label="Sprite URL"
          value={sprite}
          onChange={(event) => setSprite(event.target.value)}
          placeholder="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={createPokemonMutation.isPending}>
          {createPokemonMutation.isPending ? "Saving..." : "Create Pokemon"}
        </Button>
      </Box>

      {validationError && <Alert severity="warning">{validationError}</Alert>}
      {createPokemonMutation.isError && (
        <Alert severity="error">{createPokemonMutation.error.message || "Failed to create pokemon."}</Alert>
      )}
      {createPokemonMutation.data && (
        <Stack spacing={1}>
          <Alert severity="success">Pokemon created successfully.</Alert>
          <PokemonRow pokemon={createPokemonMutation.data} />
        </Stack>
      )}
    </Stack>
  );
}
