import "./App.css";
import * as React from "react";
import { AppContainer } from "./Components/ContainerComponents/AppContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function App() {
  const theme = createTheme({
    status: {
      danger: orange[500],
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    spacing: 4,
    palette: {
      primary: {
        main: "#303f9f",
      },
      secondary: {
        main: "#00bcd4",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1> Vesta Project </h1>
        </header>

        <AppContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
