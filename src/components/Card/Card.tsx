import { FC } from "react";
import { PokemonCard } from "../../types/Card";
import {
  BackImg,
  CardTitle,
  CardWrapper,
  FrontImg,
  FrontImgWrapper,
  TypeBackground,
  TypeWrapper,
} from "./Card.styles";
import backgroundCard from "../../assets/images/pokemon_back_card.png";

type CardProps = {
  card: PokemonCard;
  callback: (card: PokemonCard) => void;
};

const Card: FC<CardProps> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickeable) callback(card);
  };

  const { types } = card;
  const typesBg = types.length === 2 ? types : [types[0], types[0]];

  return (
    <CardWrapper onClick={handleClick} types={typesBg}>
      <CardTitle>{card.name}</CardTitle>
      <FrontImgWrapper>
        <FrontImg
          flipped={card.flipped}
          src={card.frontImage}
          alt="front-memory-card"
        />
      </FrontImgWrapper>
      <BackImg
        flipped={card.flipped}
        src={backgroundCard}
        alt="back-memory-card"
      />
      <TypeWrapper>
        {types.map((type) => (
          <TypeBackground key={`${card.id}-${type}`} type={type}>
            <img src={`${type}.png`} alt="pokemon-type" />
          </TypeBackground>
        ))}
      </TypeWrapper>
    </CardWrapper>
  );
};

export default Card;
