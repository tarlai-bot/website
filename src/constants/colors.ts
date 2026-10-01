export const colors = {
  // Primary - Deep Purple/Plum (#44273a)
  primary: {
    DEFAULT: "#44273a",
    hover: "#5a3550",
    light: "#6b4566",
    contrast: "#ffffff", // Text color on primary background
  },

  // Secondary - Orange (#ef7622)
  secondary: {
    DEFAULT: "#ef7622",
    hover: "#d66819",
    light: "#f28e45",
    contrast: "#ffffff", // Text color on secondary background
  },

  // Accent - Yellow (#fedd3d)
  accent: {
    DEFAULT: "#fedd3d",
    hover: "#fdd520",
    light: "#fee76a",
    contrast: "#000000", // Text color on accent background (black for readability)
  },
} as const;

export type ColorKey = keyof typeof colors;
