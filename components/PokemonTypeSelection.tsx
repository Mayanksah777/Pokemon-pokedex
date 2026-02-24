"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  types: string[];
};

export function PokemonTypeSelection({
  selectedType,
  selectType,
  types
}: PokemonTypeSelectionProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="pokemon-type-select-label">Type</InputLabel>
      <Select
        labelId="pokemon-type-select-label"
        label="Type"
        value={selectedType ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          selectType(value === "" ? undefined : value);
        }}
      >
        <MenuItem value="">All Types</MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
