import React from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, brown } from "@material-ui/core/colors";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f05545",
      main: "#b71c1c",
      dark: "#7f0000",
      contrastText: "#fff"
    },
    secondary: {
      light: "#efdcd5",
      main: "#d7ccc8",
      dark: "#8c7b75",
      contrastText: "#424242"
    },
    openTitle: red["500"],
    protectedTitle: brown["300"],
    type: "light"
  }
});

export default App;
