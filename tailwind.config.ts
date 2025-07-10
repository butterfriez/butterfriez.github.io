import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("@catppuccin/tailwindcss")({
    defaultFlavour: "mocha"
  })],
};

export default config;
