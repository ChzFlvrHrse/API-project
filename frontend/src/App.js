import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SubNav from './components/EventsSubNav.js'
import Events from "./components/Events";
import EventById from "./components/EventById";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <SubNav />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Events />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/events/:id">
            <EventById />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
