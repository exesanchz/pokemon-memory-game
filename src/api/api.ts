import axios from "axios";
import { IPokemon, IPokemonDetail } from "../types/ApiTypes";

const baseURL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL,
});

export const getPokemonList = async (): Promise<IPokemonDetail[]> => {
  try {
    //Get an initial pokemon list without details
    const response = await api.get("/pokemon?limit=151"); // Reference to the initial 151 classic pokemons
    const pokemonList: IPokemon[] = response.data.results;

    //Pick 4 random pokemons
    const randomPokemons: IPokemon[] = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      randomPokemons.push(pokemonList.splice(randomIndex, 1)[0]);
    }

    //Get details of the selected pokemons
    const detailedPokemonList: Promise<IPokemonDetail>[] = randomPokemons.map(
      async (pokemon) => {
        const detailedResponse = await api.get(pokemon.url);

        //Pick only the properties we want to keep
        const { id, name, sprites } = detailedResponse.data;
        return { id, name, sprites } as IPokemonDetail;
      }
    );

    return Promise.all(detailedPokemonList);
  } catch (error) {
    console.error("Error fetching random Pokemon list:", error);
    throw error;
  }
};