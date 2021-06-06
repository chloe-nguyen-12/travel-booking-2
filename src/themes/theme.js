import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
  },

  buttonPrimary: {
    backgroundColor: "#ff9800",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#f57c00",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        fontWeight: "bolder",
        color: "black",
      },
    },
  },
  palette: {
    primary: { main: "#ffa000", light: "#8C8F91" },
    secondary: { main: "#6464ff" },
  },
});
