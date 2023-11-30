import { useState, useEffect } from "react";
import { IPokemonDetail } from "../types/ApiTypes";
import { getPokemonList } from "../api/api";
import { PokemonCard } from "../types/CardTypes";
import {
  Grid,
  HeaderContainer,
  PokemonLogo,
  PokemonTitle,
} from "./Root.styles";
import ArrayUtilities from "../utils/ArrayUtilities";
import Card from "../components/Card/Card";
import pokemonLogoPng from "../assets/images/pokemon_logo.png";

const createGame = (pokemonList: IPokemonDetail[]): PokemonCard[] =>
  [...pokemonList, ...pokemonList].map((pokemon, i) => ({
    id: `poke-${i}`,
    clickeable: true,
    flipped: false,
    frontImage: pokemon.image.front_default,
    matchingId:
      i < pokemonList.length
        ? `poke-${i + pokemonList.length}`
        : `poke-${i - pokemonList.length}`,
  }));

const Root: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<IPokemonDetail[]>([]);
  const [pokemonCardList, setPokemonCardList] = useState<PokemonCard[]>([]);
  const [flippedCard, setFlippedCard] = useState<PokemonCard | undefined>(
    undefined
  );
  const [matchedCards, setMatchedCards] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const randomPokemons = await getPokemonList();
        setPokemonList(randomPokemons);
        setError(null);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        setError("Error fetching Pokemon list. Please retry.");
        setTimeout(fetchPokemonList, 5000); // Retry after 5 seconds
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      setPokemonCardList(ArrayUtilities.shuffle(createGame(pokemonList)));
    }
  }, [pokemonList]);

  const handleFlip = (currentFlippedCard: PokemonCard) => {
    //Extra logic to wait until cards are flipped back to enable this function
    if (isFlipping) {
      return;
    }
    setIsFlipping(true);

    setPokemonCardList((prev) =>
      prev.map((pokeCard: PokemonCard) =>
        pokeCard.id === currentFlippedCard.id
          ? { ...pokeCard, clickeable: false, flipped: true }
          : pokeCard
      )
    );

    //Check if there's another card flipped
    if (!flippedCard) {
      setFlippedCard({ ...currentFlippedCard });
      setIsFlipping(false);
      return;
    }

    //Check if the card matches to another one
    if (flippedCard.matchingId === currentFlippedCard.id) {
      setMatchedCards((prev) => prev + 1);
      setPokemonCardList((prev) =>
        prev.map((pokeCard: PokemonCard) =>
          pokeCard.id === currentFlippedCard.id ||
          pokeCard.id === flippedCard.id
            ? { ...pokeCard, clickeable: false }
            : pokeCard
        )
      );
      setIsFlipping(false);
      setFlippedCard(undefined); //Clean the flipped regiter
      return;
    }

    //Default case: didn't match so flip all cards back
    Promise.all([
      setTimeout(() => {
        setPokemonCardList((prev) =>
          prev.map((pokeCard: PokemonCard) =>
            pokeCard.id === currentFlippedCard.id ||
            pokeCard.id === flippedCard.id
              ? { ...pokeCard, clickeable: true, flipped: false }
              : pokeCard
          )
        );
        setIsFlipping(false);
      }, 1000),
      setFlippedCard(undefined),
    ]);
  };

  useEffect(() => {
    if (pokemonList.length > 0 && matchedCards === pokemonList.length) {
      setTimeout(() => {
        window.alert("Congrats! you won");
      }, 1000);
    }
  }, [matchedCards, pokemonList]);

  return (
    <>
      <HeaderContainer>
        <div>
          <PokemonLogo src={pokemonLogoPng} alt="pokemon-logo-png" />
        </div>
        <PokemonTitle>MEMO GAME</PokemonTitle>
      </HeaderContainer>
      <Grid>
        {pokemonCardList &&
          pokemonCardList.map((pokemon) => (
            <Card key={pokemon.id} card={pokemon} callback={handleFlip} />
          ))}
      </Grid>
    </>
  );
};

export default Root;
