type PokemonCard = {
  id: string;
  clickeable: boolean;
  flipped: boolean;
  frontImage: string;
  matchingId: string;
  types: string[];
};

export type { PokemonCard };
