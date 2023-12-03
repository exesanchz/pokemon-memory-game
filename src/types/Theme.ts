type ThemeColors = {
  primary: string;
  secondary: string;
  primaryBlue: string;
  primaryYellow: string;
  primaryError: string;
  primaryButton: string;
  ButonText: string;
  type: TypesColors;
  cardBg: TypesColors;
};

type ThemeImages = {
  appBg: string;
};

type Theme = {
  colors: ThemeColors;
  images: ThemeImages;
  fontSize?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
};

type TypesColors = {
  grass: string;
  poison: string;
  normal: string;
  fire: string;
  water: string;
  electric: string;
  ice: string;
  fighting: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dark: string;
  dragon: string;
  steel: string;
  fairy: string;
};

export type { ThemeColors, ThemeImages, Theme };
