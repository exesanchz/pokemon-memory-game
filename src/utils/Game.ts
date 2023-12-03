import { IPokemonDetail } from "../types/Api";
import { PokemonCard } from "../types/Card";

const Game = {
  /**
   * Returns an array with the neccesary info to display the cards
   */
  create: (pokemonList: IPokemonDetail[]): PokemonCard[] =>
    [...pokemonList, ...pokemonList].map((pokemon, i) => {
      const cardTypes = pokemon.types.map((t) => t.type.name);
      return {
        id: `poke-${i}`,
        clickeable: true,
        flipped: false,
        frontImage: pokemon.sprites.other.dream_world.front_default,
        matchingId:
          i < pokemonList.length
            ? `poke-${i + pokemonList.length}`
            : `poke-${i - pokemonList.length}`,
        types: cardTypes,
      };
    }),
};

export default Game;
