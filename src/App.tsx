import LandingPageComponent from "./components/LandingPageComponent";
import MenuComponent from "./components/Menu/MenuComponent";
import BookingsComponent from "./components/Bookings/BookingsComponent";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/Contact/Contact";
import CancellationComponent from "./components/Cancellation/CancellationComponent";
import ConfirmCancellationComponent from "./components/ConfirmCancellation/ConfirmCancellationComponent";
import { BookingConfirmation } from "./components/Bookings/BookingConfirmation";
import { AdminBookingsComponent } from "./components/Admin/AdminBookingsComponent";
import { AdminBookingComponent } from "./components/Admin/AdminBookingComponent";
import AdminEditComponent from "./components/Admin/AdminEditComponent";
import HomeButtonComponent from "./components/HomeButtonComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <section className="homeContainer">
              <section className="homePage">
                <LandingPageComponent />
                <MenuComponent />
              </section>
            </section>
          </Route>
          <Route path="/bookings">
            <HomeButtonComponent />
            <BookingsComponent />
          </Route>
          <Route path="/confirmation">
            <HomeButtonComponent />
            <BookingConfirmation />
          </Route>
          <Route path="/contact">
            <HomeButtonComponent />
            <Contact />
          </Route>
          <Route path="/admin/bookings">
            <HomeButtonComponent />
            <AdminBookingsComponent />
          </Route>
          <Route path="/admin/booking/:id">
            <HomeButtonComponent />
            <AdminBookingComponent />
          </Route>
          <Route path="/admin/edit/:id">
            <HomeButtonComponent />
            <AdminEditComponent />
          </Route>
          <Route path="/cancellation/:bookingReference">
            <HomeButtonComponent />
            <CancellationComponent />
          </Route>
          <Route path="/confirmCancellation">
            <HomeButtonComponent />
            <ConfirmCancellationComponent />
          </Route>{" "}
          <Route path="*">
            <HomeButtonComponent />
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
