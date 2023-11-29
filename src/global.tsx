import { createGlobalStyle } from "styled-components";

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

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
