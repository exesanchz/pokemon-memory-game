import { Theme } from "../../types/ThemeTypes";
import backgroundPokemonImage from "../../assets/images/pokemon_forest.jpeg";
import backgroundDMPokemonImage from "../../assets/images/pokemon_night_forest.jpeg";

const lightTheme = {
  colors: {
    primary: "#FFFFFF",
    secondary: "#6B6B6B",
    primaryBlue: "#0075BE",
    primaryYellow: "#FFCC00",
    primaryError: "#E18484",
    primaryButton: "#B5B5B51F",
    ButonText: "#6B6B6B",
  },
  images: {
    appBg: backgroundPokemonImage,
  },
};

const darkTheme = {
  colors: {
    primary: "#6B6B6B",
    secondary: "#FFFFFF",
    primaryBlue: "#0075BE",
    primaryYellow: "#FFCC00",
    primaryError: "#E18484",
    primaryButton: "#FFFFFF99",
    ButonText: "#6B6B6B",
  },
  images: {
    appBg: backgroundDMPokemonImage,
  },
};

const defaultTheme = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
};

const theme: Record<"dark" | "light", Theme> = {
  dark: {
    colors: darkTheme.colors,
    images: darkTheme.images,
    ...defaultTheme,
  },
  light: {
    colors: lightTheme.colors,
    images: lightTheme.images,
    ...defaultTheme,
  },
};

export default theme;
