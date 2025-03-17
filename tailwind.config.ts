import type { Config } from 'tailwindcss'

/**
 * Custom Shadcn Theme palette
 * @see https://github.com/JairHuamanBellido/Oxidus
 * @see https://ui.shadcn.com/docs/theming
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1440px',
      },
    },
    borderRadius: {
      xl: 'var(--radius) + 4px',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ addUtilities }: any) {
      addUtilities({
        '.decoration-wavy': {
          'text-decoration-style': 'wavy',
        },
      })
    },
  ],
}
export default config
