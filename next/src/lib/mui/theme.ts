import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#138C7B",
    },
    secondary: {
      main: "#8C1325",
    },
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: "2.4rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
    h5: {
      fontSize: "1.1rem",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          lineHeight: "normal",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
