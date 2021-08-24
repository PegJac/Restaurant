import React from "react";
import LandingPageComponent from "./components/LandingPageComponent";
import MenuComponent from "./components/Menu/MenuComponent";
import BookingsComponent from "./components/Bookings/BookingsComponent";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/bookings">
            <BookingsComponent />
          </Route>
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
