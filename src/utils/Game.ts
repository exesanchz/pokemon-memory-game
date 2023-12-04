import { IPokemonDetail } from "../types/Api";
import { PokemonCard } from "../types/Card";
import StringUtilities from "./String";

const GameUtilities = {
  /**
   * Returns an array with the neccesary info to display the cards
   */
  create: (pokemonList: IPokemonDetail[]): PokemonCard[] =>
    [...pokemonList, ...pokemonList].map((pokemon, i) => {
      const cardTypes = pokemon.types.map((t) => t.type.name);
      return {
        id: `poke-${i}`,
        name: StringUtilities.capitalizeFirstLetter(pokemon.name),
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

export default GameUtilities;
