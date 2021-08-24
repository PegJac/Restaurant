import React from 'react';
import logo from './logo.svg';
import './index.scss';
import LandingPageComponent from './components/LandingPageComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BookingComponent from './components/BookingComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/booking">
            <BookingComponent />
          </Route>
          <Route path="/">
            <LandingPageComponent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
