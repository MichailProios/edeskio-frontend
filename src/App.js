//Basic dependencies
import React, { useState, useEffect } from "react";
//import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

//Styling
import "./App.css";

//Pages
import LandingPage from "./pages/LandingPage/LandingPage";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#B7B7B7 transparent",
      "&::-webkit-scrollbar": {
        width: 8,
        height: 6,
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 6,
        backgroundColor: "#B7B7B7",
        minHeight: 24,
        minWidth: 24,
      },
      "&::-webkit-scrollbar-thumb:focus": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-thumb:active": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-corner": {
        backgroundColor: "transparent",
      },
    },
  },
}));

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0ec6cb",
    },
    secondary: {
      main: "#39a9f1",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2160,
      xxxl: 3840,
    },
  },
});

function App() {
  const styles = useStyles();

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <ThemeProvider theme={theme}>
        <LandingPage />
        <Router>
          <Routes>
            <Route path="/" exact element={<div />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
