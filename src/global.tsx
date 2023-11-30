import { createGlobalStyle } from "styled-components";
import backgroundPokemonImage from "./assets/images/pokemon_forest.jpeg";

const GlobalStyle = createGlobalStyle`
  
  :root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    height: 100%;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    background-image: url(${backgroundPokemonImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media (max-width: 600px) {
      background-attachment: fixed; /* Allow scrolling on mobile view */
    }
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }

  @font-face {
  font-family: 'PokemonFont';
  src: url('src/assets/fonts/Pokemon Solid.ttf') format('truetype');
  }

  h1 {
    font-family: 'PokemonFont', sans-serif;
  }
`;

export default GlobalStyle;
