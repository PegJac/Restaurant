import React from 'react';
import LandingPageComponent from './components/LandingPageComponent';
import MenuComponent from './components/Menu/MenuComponent';
import BookingsComponent from './components/Bookings/BookingsComponent';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Contact from './components/Contact/Contact';
import { BookingConfirmation } from './components/Bookings/BookingConfirmation';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPageComponent />
            <MenuComponent />
          </Route>
          <Route path="/bookings">
            <BookingsComponent />
          </Route>
          <Route path="/confirmation">
            <BookingConfirmation />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
