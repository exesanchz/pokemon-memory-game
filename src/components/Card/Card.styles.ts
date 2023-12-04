import styled, { css } from "styled-components";

type CardWrapperProps = {
  types: string[];
};

export const CardWrapper = styled.div<CardWrapperProps>`
  ${({ types, theme }) => `
    position: relative;
    perspective: 1000px;
    width: auto;
    height: 100%;
    max-height: 250px;
    aspect-ratio: 818 / 1111; /* Based on BackImg aspect ratio */
    background: linear-gradient(${theme.colors.cardBg[types[0]]}, ${
    theme.colors.cardBg[types[1]]
  });
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .front.flipped {
      z-index: 1;
      transform: rotateY(180deg);
    }

    @media (min-width: 600px) {
      &:hover {
        transform: scale(1.1);
       }
   
    }

    @media (max-width: 600px) {
      max-height: 190px;
    }
  
    `}
`;

export const CardTitle = styled.h2`
  margin: 10 0 0 0;
  font-family: "Press Start 2P", cursive;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  z-index: 2;
`;

type ImgProps = {
  flipped: boolean;
};

const sharedStyles = css`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
`;

export const FrontImgWrapper = styled.div`
  padding: 1em;
  max-height: 100px;
  overflow: hidden;
`;

export const FrontImg = styled.img<ImgProps>`
  ${sharedStyles}

  max-height: 100%;
  z-index: ${({ flipped }) => (flipped ? 2 : 1)};
  transform: ${(flipped) => (flipped ? "rotate(0deg)" : "rotateY(180deg)")};
  object-fit: contain;
  box-sizing: border-box;
`;

export const BackImg = styled.img<ImgProps>`
  ${sharedStyles}

  z-index: ${({ flipped }) => (flipped ? 1 : 2)};
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotate(360deg)"};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 10px;
`;

export const TypeWrapper = styled.div`
  display: flex;
  grid-gap: 0 10px;
  gap: 0 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

type TypeBackgroundProps = {
  type: string;
};

export const TypeBackground = styled.div<TypeBackgroundProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, type }) => theme.colors.type[type]};
  box-shadow: 0 0 20px ${({ theme, type }) => theme.colors.type[type]};

  & > img {
    width: 20px;
    height: 20px;
  }
`;
