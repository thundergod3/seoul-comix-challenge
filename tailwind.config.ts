import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#344054',
        yellow1: '#FDB022',
        white1: 'rgba(255, 255, 255, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
