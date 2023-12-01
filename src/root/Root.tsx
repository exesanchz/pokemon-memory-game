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
import Modal from "../components/Modal/Modal";
import { ModalEnum } from "../types/ModalTypes";

const POKEMON_QTY = 4; //We can choose here how many pokemons we play with

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<undefined | ModalEnum>(undefined);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const fetchPokemonList = async () => {
    try {
      const randomPokemons = await getPokemonList(POKEMON_QTY);
      setPokemonList(randomPokemons);
      setError(null);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      setError(
        "There was an error trying to load the game. Retrying in 5 seconds..."
      );
      setTimeout(fetchPokemonList, 5000); // Retry after 5 seconds
    }
  };
  useEffect(() => {
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
        openModal(
          "CONGRATULATIONS",
          "You finished the game. Shall we play again?",
          ModalEnum.Victory
        );
        setMatchedCards(0);
      }, 300);
    }
  }, [matchedCards, pokemonList]);

  useEffect(() => {
    if (error) {
      openModal("OOPS...something went wrong!", error, ModalEnum.Error);
    }
  }, [error]);

  const openModal = (title: string, message: string, type: ModalEnum) => {
    Promise.all([
      setIsModalOpen(true),
      setModalTitle(title),
      setModalMessage(message),
      setModalType(type),
    ]);
  };

  const cleanModal = () => {
    Promise.all([
      setIsModalOpen(false),
      setModalTitle(""),
      setModalMessage(""),
      setModalType(undefined),
    ]);
  };

  const victoryCallback = () => {
    fetchPokemonList();
    cleanModal();
  };

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
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        callback={victoryCallback}
      />
    </>
  );
};

export default Root;
