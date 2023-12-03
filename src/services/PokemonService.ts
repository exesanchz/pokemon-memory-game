import { IPokemon, IPokemonDetail } from "../types/Api";
import api from "../utils/Axios";

const POKEMON_LIMIT = 151; // Reference to the initial 151 classic pokemons

export const getPokemonList = async (
  pokemonQty: number
): Promise<IPokemonDetail[]> => {
  try {
    //Get an initial pokemon list without details
    const response = await api.get(`/pokemon?limit=${POKEMON_LIMIT}`);
    const pokemonList: IPokemon[] = response.data.results;

    //Pick random pokemons
    const randomPokemons: IPokemon[] = [];
    for (let i = 0; i < pokemonQty; i++) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      randomPokemons.push(pokemonList.splice(randomIndex, 1)[0]);
    }

    //Get details of the selected pokemons
    const detailedPokemonList: Promise<IPokemonDetail>[] = randomPokemons.map(
      async (pokemon) => {
        const detailedResponse = await api.get(pokemon.url);

        //Pick only the properties we want to keep
        const { id, name, sprites, types } = detailedResponse.data;
        return { id, name, sprites, types } as IPokemonDetail;
      }
    );

    return Promise.all(detailedPokemonList);
  } catch (error) {
    console.error("Error fetching random Pokemon list:", error); //Works as a logger
    throw error;
  }
};
