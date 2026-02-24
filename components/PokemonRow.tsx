"use client";

import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import type { PokemonDto } from "@/types/pokemon";

export type PokemonRowProps = {
  pokemon: PokemonDto;
};

export function PokemonRow({ pokemon }: PokemonRowProps) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              ID #{pokemon.id}
            </Typography>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {pokemon.name}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
              {pokemon.types.map((type) => (
                <Chip key={type} label={type} color="primary" variant="outlined" />
              ))}
            </Stack>
          </Box>
          <Box
            component="img"
            src={pokemon.sprite}
            alt={pokemon.name}
            width={96}
            height={96}
            sx={{ imageRendering: "pixelated" }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
