import styled, { css } from "styled-components";

export const CardWrapper = styled.div`
  position: relative;
  perspective: 1000px;
  width: auto;
  height: auto;
  max-height: 250px;
  aspect-ratio: 818 / 1111; /* Based on BackImg aspect ratio */
  background: radial-gradient(
    circle at 85.4% 50.8%,
    rgb(14, 72, 222) 0%,
    rgb(3, 22, 65) 74.2%
  );
  display: flex;

  .front.flipped {
    z-index: 1;
    transform: rotateY(180deg);
  }
`;

type Props = {
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
  padding: 1.5em;
`;

export const FrontImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${(props) => (props.flipped ? 2 : 1)};
  transform: ${(props) => (props.flipped ? "rotate(0deg)" : "rotateY(180deg)")};
  object-fit: contain;
  box-sizing: border-box;
`;

export const BackImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${(props) => (props.flipped ? 1 : 2)};
  transform: ${(props) =>
    props.flipped ? "rotateY(180deg)" : "rotate(360deg)"};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`;
