import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        milk: '#F3F0E8',
        'milk-light': '#FAF8F5',
        sand: '#D7C9B5',
        'sand-light': '#E8DFC5',
        sage: '#AAB2A0',
        'sage-dark': '#8A9480',
        olive: '#66705A',
        'olive-dark': '#4D5543',
        graphite: '#252722',
        'graphite-dark': '#1A1C18',
        ochre: '#B98543',
        'ochre-light': '#D4A362',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}
export default config
