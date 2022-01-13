module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      '40': "4.0rem",
      '32': "3.2rem",
      '22': "2.2rem",
      '20': "2.0rem",
      '18': "1.8rem",
      '16': "1.6rem",
      '14': "1.4rem",
      '12': "1.2rem",
    },
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      width: {
        'fit': 'fit-content'
      },
      colors: {
        yellow: '#FFDD00',
        'yellow-focus': '#DDC001',
      },
      borderWidth: {
        '1': '1px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require(`@tailwindcss/typography`)
  ],
  daisyui:{
    themes: [
      {
        'dogtra': {                          /* your theme name */
          "primary": "#FFDD00",
          "primary-focus": "#DDC001",
          "primary-content": "#000000",
          "secondary": "#1fd65f",
          "secondary-focus": "#18aa4b",
          "secondary-content": "#ffffff",
          "accent": "#d99330",
          "accent-focus": "#b57721",
          "accent-content": "#ffffff",
          "neutral": "#110e0e",
          "neutral-focus": "#060404",
          "neutral-content": "#ffffff",
          "base-100": "#171212",
          "base-200": "#110e0e",
          "base-300": "#060404",
          "base-content": "#ffffff",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f",
          "--border-color": "var(--b3)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      }
    ]
  }
}
