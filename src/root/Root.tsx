import { useState, useEffect, FC, useCallback } from "react";
import { IPokemonDetail } from "../types/Api";
import { getPokemonList } from "../services/PokemonService";
import { PokemonCard } from "../types/Card";
import {
  Grid,
  HeaderContainer,
  PokemonLogo,
  PokemonTitle,
  ToggleButton,
} from "./Root.styles";
import ArrayUtilities from "../utils/Array";
import Card from "../components/Card/Card";
import pokemonLogoPng from "../assets/images/pokemon_logo.png";
import Modal from "../components/Modal/Modal";
import { ModalEnum } from "../types/Modal";
import { useTheme } from "../hooks/useTheme";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import GameUtilities from "../utils/Game";
import SoundsUtilities from "../utils/Sounds";

const POKEMON_QTY = 4; //We can choose here how many pokemons we play with

const Root: FC = () => {
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

  const { currentTheme, toggleTheme } = useTheme();

  const fetchPokemonList = useCallback(async () => {
    try {
      const randomPokemons = await getPokemonList(POKEMON_QTY);
      setPokemonList(randomPokemons);
      setError(null);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error); //Works as a logger, will be removed in real case
      setError("There was an error trying to load the game.");
    }
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  useEffect(() => {
    if (pokemonList.length > 0) {
      setPokemonCardList(
        ArrayUtilities.shuffle(GameUtilities.create(pokemonList))
      );
    }
  }, [pokemonList]);

  const handleFlip = (currentFlippedCard: PokemonCard) => {
    //Extra logic to wait until cards are flipped back to enable this function
    if (isFlipping) {
      return;
    }
    SoundsUtilities.playFlip();
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
        SoundsUtilities.playNotMatch();
      }, 1000),
      setFlippedCard(undefined),
    ]);
  };

  useEffect(() => {
    if (matchedCards > 0 && matchedCards < pokemonList.length) {
      SoundsUtilities.playMatch();
    }
    if (pokemonList.length > 0 && matchedCards === pokemonList.length) {
      setTimeout(() => {
        openModal(
          "CONGRATULATIONS!",
          "You won the game! Shall we play again?",
          ModalEnum.Victory
        );
        SoundsUtilities.playVictory();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedCards]);

  useEffect(() => {
    if (error) {
      openModal("OOPS...Something went wrong!", error, ModalEnum.Error);
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
      setError(null),
    ]);
  };

  const modalCallback = async () => {
    if (pokemonList.length > 0 && matchedCards === pokemonList.length) {
      setMatchedCards(0);
      await fetchPokemonList();
    }
    cleanModal();
  };

  const icon =
    currentTheme === "light" ? <HiMoon size={40} /> : <CgSun size={25} />;

  return (
    <>
      <ToggleButton onClick={toggleTheme}>{icon}</ToggleButton>
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
        callback={modalCallback}
      />
    </>
  );
};

export default Root;
