type ThemeColors = {
  primary: string;
  secondary: string;
  primaryBlue: string;
  primaryYellow: string;
  primaryError: string;
  primaryButton: string;
  ButonText: string;
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

export type { ThemeColors, ThemeImages, Theme };
