"use client";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import type { PokemonDto } from "@/types/pokemon";

export type PokedexTableProps = {
  pokemonList: PokemonDto[];
};

export function PokedexTable({ pokemonList }: PokedexTableProps) {
  if (pokemonList.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">No Pokemon found.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Sprite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonList.map((pokemon) => (
            <TableRow key={pokemon.id}>
              <TableCell>{pokemon.id}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>{pokemon.name}</TableCell>
              <TableCell>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {pokemon.types.map((type) => (
                    <Chip key={`${pokemon.id}-${type}`} label={type} size="small" />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  component="img"
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  width={64}
                  height={64}
                  sx={{ imageRendering: "pixelated" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
