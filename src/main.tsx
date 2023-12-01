import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { theme } from "./global.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </StyleSheetManager>
);
