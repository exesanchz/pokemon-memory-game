import { FC } from "react";
import { PokemonCard } from "../../types/CardTypes";
import { BackImg, CardWrapper, FrontImg } from "./Card.styles";
import backgroundCard from "../../assets/pokemon_back_card.png";

type Props = {
  card: PokemonCard;
  callback: (card: PokemonCard) => void;
};

const Card: FC<Props> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickeable) callback(card);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <FrontImg
        flipped={card.flipped}
        src={card.frontImage}
        alt="front-memory-card"
      />
      <BackImg
        flipped={card.flipped}
        src={backgroundCard}
        alt="back-memory-card"
      />
    </CardWrapper>
  );
};

export default Card;
