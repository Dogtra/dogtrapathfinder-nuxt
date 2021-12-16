module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
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
          "primary": "#ffde01",
          "primary-focus": "#ffde01",
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
        }
      }
    ]
  }
}
