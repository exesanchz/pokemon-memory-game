import { useState, useEffect } from "react";
import { IPokemonDetail } from "../types/ApiTypes";
import { getPokemonList } from "../api/api";
import { PokemonCard } from "../types/CardTypes";
import { Grid } from "./Root.styles";
import ArrayUtilities from "../utils/ArrayUtilities";
import Card from "../components/Card/Card";

const createGame = (pokemonList: IPokemonDetail[]): PokemonCard[] =>
  [...pokemonList, ...pokemonList].map((pokemon, i) => ({
    id: `poke-${i}`,
    clickeable: true,
    flipped: false,
    frontImage: pokemon.sprites.front_default,
    matchingId:
      i < pokemonList.length
        ? `poke-${i + pokemonList.length}`
        : `poke-${i - pokemonList.length}`,
  }));

function Root() {
  const [pokemonList, setPokemonList] = useState<IPokemonDetail[]>([]);
  const [pokemonCardList, setPokemonCardList] = useState<PokemonCard[]>([]);
  /* const [flippedCard, setFlippedCard] = useState<PokemonCard | undefined>(
    undefined
  );
  const [matchedCards, setMatchedCards] = useState(0);
  const [won, setWon] = useState(false); */

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const randomPokemons = await getPokemonList();
        setPokemonList(randomPokemons);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      setPokemonCardList(ArrayUtilities.shuffle(createGame(pokemonList)));
    }
  }, [pokemonList]);

  const handleFlip = () => {
    console.log("click");
  };

  return (
    <Grid>
      {pokemonCardList &&
        pokemonCardList.map((pokemon) => (
          <Card key={pokemon.id} card={pokemon} callback={handleFlip} />
        ))}
    </Grid>
  );
}

export default Root;
