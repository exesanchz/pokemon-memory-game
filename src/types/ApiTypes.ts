interface IPokemon {
  name: string;
  url: string; // URL to get detailed pokemon info
}

interface IPokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string; // URL pokemon image
  };
}

export type { IPokemon, IPokemonDetail };

/* export interface PokemonListResponse {
  results: Pokemon[];
} */
