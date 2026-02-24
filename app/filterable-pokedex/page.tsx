import { Stack, Typography } from "@mui/material";

import { FilterablePokedexTable } from "@/components/FilterablePokedexTable";

export default function FilterablePokedexPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Filter by Type</Typography>
      <FilterablePokedexTable />
    </Stack>
  );
}
