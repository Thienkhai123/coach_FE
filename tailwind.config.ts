import type { Config } from "tailwindcss";

const colors = {
  orange: "#ef5222",
  "Subtle-1": "#61646B",
  normal: "#19191B",
  "Subtle-2": "#AFB1B6",
  common: "#EFEFF0",
  "neutral-grey-000": "#F9F9F9",
  "neutral-grey-100": "#EBEBEB",
  "neutral-grey-200": "#D9D9D9",
  "neutral-grey-300": "#C0C0C0",
  "neutral-grey-400": "#898C8D",
  "neutral-grey-500": "#6A6F70",
  "neutral-grey-600": "#373738",
  "neutral-grey-700": "#101F24",
  primary: "#E6795E",
  "primary-200": "#59180F",
  "primary-300": "#8A2E19",
  "primary-400": "#BE3C2A",
  "primary-500": "#DF5030",
  "primary-600": "#E6795E",
  "primary-800": "#F6CDB5",
  "primary-900": "#FCE6D5",
  "primary-1000": "#FFF9F4",
  blue: "#EDF8FF",

  "blue-300": "#0273BC",
  disabled: "#00000080",
  secondary: {
    100: "#063F65",
    200: "#DFF0FB",
    300: "#0273BC",
    500: "#A6D0F7",
    600: "#DFF0FB",
  },
  semantic: {
    red: "#E61C1C",
    green: "#00993D",
    "green-light": "#DEF5E0",
    "blue-light": "#E6F0FD",
  },
};

const fontStyles = {};

const widths = {
  default: "1140px",
};

const backgroundImage = {
  "header-mobile": "url('/images/banner_mobile.jpg')",
  "authen-mobile": "url('/images/bg-authen-mobile.png')",
  "checkOrder-desktop": "url('/images/bg-checkOrder-desktop.png')",
};

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: { ...backgroundImage },
      colors: { ...colors },
      fontSize: {
        ...fontStyles,
      },
      width: { ...widths },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutToRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        rotateDownToUp: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: " rotate(180deg)" },
        },
        rotateUpToDown: {
          "0%": { transform: " rotate(180deg)" },
          "100%": { transform: "rotate(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s forwards",
        fadeIn1: "fadeIn 1s forwards",
        fadeIn15: "fadeIn 1.5s forwards",
        fadeIn2: "fadeIn 2s forwards",
        fadeOut: "fadeOut 0.5s forwards",
        slideInFromRight: "slideInFromRight 0.2s forwards",
        slideOutToRight: "slideOutToRight 0.2s ease-out forwards",
        rotateDownToUp: "rotateDownToUp 0.3s forwards",
        rotateUpToDown: "rotateUpToDown 0.1s forwards",
      },
    },
  },
  plugins: [],
  safelist: [{ pattern: /bg-(primary|disabled|primary-500|primary-600)/ }],
};
export default config;
