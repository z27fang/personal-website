module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"]
    },
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        primary: "#008aff",
        "primary-gray": "#0075d9",
        danger: "#f25767",
        "background-gray": "#fafbfe",
        "card-pink": "#fdebed",
        "card-green": "#ebf9f4",
        "card-yellow": "#fff7e8",
        "dark-light": "#241e6f",
        dark: "#171347",
        "footer-gray": "#a0aec0",
        "button-yellow": "#ffbe3d"
      },
      letterSpacing: {
        tighter: "-.04em"
      },
      lineHeight: {
        tight: 1.2
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)"
      },
      keyframes: {
        flip: {
          transform: 'rotateY(180deg)'
        }
      },
      animation: {
        flip: "flip"
      }
    }
  }
};