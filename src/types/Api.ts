interface IPokemon {
  name: string;
  url: string; // URL to get detailed pokemon info
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface IPokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string; // URL pokemon image
      };
    };
  };
  types: PokemonType[];
}

export type { IPokemon, IPokemonDetail };
