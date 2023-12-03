import { Theme } from "../../types/Theme";
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
    cardBg: {
      grass: "#a8ff98",
      poison: "#d6a2e4",
      normal: "#dcdcdc",
      fire: "#ffb971",
      water: "#8cc4e2",
      electric: "#ffe662",
      ice: "#8cf5e4",
      fighting: "#da7589",
      ground: "#e69a74",
      flying: "#bbc9e4",
      psychic: "#ffa5da",
      bug: "#bae05f",
      rock: "#C9BB8A",
      ghost: "#8291e0",
      dark: "#8e8c94",
      dragon: "#88a2e8",
      steel: "#9fb8b9",
      fairy: "#fdb9e9",
    },
    type: {
      grass: "#4CAF50",
      bug: "#A8B820",
      dark: "#705848",
      dragon: "#7038F8",
      electric: "#F8D030",
      fairy: "#EE99AC",
      fighting: "#C03028",
      flying: "#A890F0",
      ghost: "#705898",
      ground: "#E0C068",
      ice: "#98D8D8",
      normal: "#A8A878",
      poison: "#A040A0",
      psychic: "#F85888",
      rock: "#B8A038",
      steel: "#B8B8D0",
      water: "#6890F0",
      fire: "#F08030",
    },
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
    cardBg: {
      grass: "#33691E",
      poison: "#452A3A",
      normal: "#343434",
      fire: "#6D2B00",
      water: "#1E3945",
      electric: "#5D5113",
      ice: "#205758",
      fighting: "#842C4C",
      ground: "#593C26",
      flying: "#2D4262",
      psychic: "#8B395F",
      bug: "#556B2F",
      rock: "#6A5F3B",
      ghost: "#2C3B77",
      dark: "#383533",
      dragon: "#1D2766",
      steel: "#6F7077",
      fairy: "#8C3A5E",
    },
    type: {
      grass: "#4E8234",
      bug: "#6D7815",
      dark: "#49392F",
      dragon: "#4924A1",
      electric: "#A1871F",
      fairy: "#9B6470",
      fighting: "#7D1F1A",
      flying: "#6D5E9C",
      ghost: "#493963",
      ground: "#927D44",
      ice: "#638D8D",
      normal: "#A29288",
      poison: "#682A68",
      psychic: "#A13959",
      rock: "#786824",
      steel: "#787887",
      water: "#445E9C",
      fire: "#B53121",
    },
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
