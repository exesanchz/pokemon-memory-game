type PokemonCard = {
  id: string;
  name: string;
  clickeable: boolean;
  flipped: boolean;
  frontImage: string;
  matchingId: string;
  types: string[];
};

export type { PokemonCard };
