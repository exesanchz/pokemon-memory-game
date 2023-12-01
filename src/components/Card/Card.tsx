import { FC } from "react";
import { PokemonCard } from "../../types/CardTypes";
import { BackImg, CardWrapper, FrontImg, FrontImgWrapper } from "./Card.styles";
import backgroundCard from "../../assets/images/pokemon_back_card.png";

type CardProps = {
  card: PokemonCard;
  callback: (card: PokemonCard) => void;
};

const Card: FC<CardProps> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickeable) callback(card);
  };

  return (
    <CardWrapper onClick={handleClick}>
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
    </CardWrapper>
  );
};

export default Card;
