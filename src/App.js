// @import ::
import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// @context ::
import { ThreeDxProvider } from "./components/3dx/_context3dx";

// @component ::
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Album from "./components/album/Album";
import ThreeDx from "./components/3dx/ThreeDx";
import AlbumDetails from "./components/3dx/Album";

const outerTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      paper: "#17202A",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/albums" component={Album} />
            <ThreeDxProvider>
              <Route exact path="/3dx" component={ThreeDx} />

              <Route exact path="/3dx/:albumID" component={AlbumDetails} />
            </ThreeDxProvider>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
