import { FC } from "react";
import Root from "./root/Root";
import GlobalStyle from "./global";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import ThemeProvider from "./providers/theme/ThemeProvider";

const App: FC = () => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <ThemeProvider>
        <GlobalStyle />
        <Root />
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
