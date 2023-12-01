import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 0.2fr));
  }

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, minmax(120px, 0.15fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(4, minmax(120px, 0.15fr));
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const PokemonLogo = styled.img`
  max-width: 100%;
  margin: 20 20 20 0;
  max-height: 150px;
`;

export const PokemonTitle = styled.h1`
  ${(props) => {
    const { primaryYellow, primaryBlue } = props.theme.colors;

    return `
      color: ${primaryYellow};
      letter-spacing: 2px;
      margin: 0;
      text-shadow: -1px 0 ${primaryBlue}, 0 4px ${primaryBlue}, 1px 0 ${primaryBlue}, 0 -1px ${primaryBlue};
    `;
  }}
`;
