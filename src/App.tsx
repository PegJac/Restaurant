import React from 'react';
import LandingPageComponent from './components/LandingPageComponent';
import MenuComponent from './components/Menu/MenuComponent';
import BookingsComponent from './components/Bookings/BookingsComponent';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <LandingPageComponent />
            <MenuComponent />
          </Route>
          <Route path='/bookings'>
            <BookingsComponent />
          </Route>
          <Route path='*'>
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
