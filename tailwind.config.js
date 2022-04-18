const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        gray: colors.neutral,
        coolgray: colors.gray
      },
      cursor: {
        menu: 'context-menu'
      },
      fontFamily: {
        'serif': ['Moret-Bold', ...defaultTheme.fontFamily.serif ],
        'sans': ["-apple-system", "BlinkMacSystemFont", "Inter", "system-ui", ...defaultTheme.fontFamily.sans]
      },
      lineHeight: {
        'super-tight': '0.94',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800')
          },
        },
        'base': {
          css: {
            fontSize: '1.0625rem'
          },
        }
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
