import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': {
          100:'#FF6600',
          200:'#ff983f',
          300:'#ffffa1',
        },
        'accent': {
          100:'#FF9933',
          200:'#903e00',
        },
        'text': {
          100:'#333333',
          200:'#5c5c5c',
        },
        'background': {
          100:'#ffffff',
          200:'#f5f5f5',
          300:'#cccccc',
        }
      },
    },
  },
  plugins: [],
}
export default config
