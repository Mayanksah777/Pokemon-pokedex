export type PokemonDto = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

export type PaginatedPokemonDto = {
  items: PokemonDto[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
};
