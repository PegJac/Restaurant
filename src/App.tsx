import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPageComponent from "./components/LandingPageComponent";
import MenuComponent from "./components/Menu/MenuComponent";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <LandingPageComponent />
            <MenuComponent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
