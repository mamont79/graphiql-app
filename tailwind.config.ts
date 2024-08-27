import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        text: '#1F2937',
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#248CF3',
        accentSecondary: '#C2A5FC',
        muted: '#9CA3AF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: PluginAPI) {
      addComponents({
        '.btn': {
          padding: '12px 24px',
          minWidth: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.xl'),
          backgroundColor: theme('colors.accent'),
          transition: 'background-color 0.2s ease',
          color: theme('colors.black'),
          '&:hover': {
            backgroundColor: '#2081e1',
          },
        },
        '.btn-accent-secondary': {
          backgroundColor: theme('colors.accentSecondary'),
          '&:hover': {
            backgroundColor: '#af94e4',
          },
        },
      });
    },
  ],
};
export default config;
