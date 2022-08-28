import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SubNav from './components/EventsSubNav.js'
import Events from "./components/Events";
import EventById from "./components/EventById";
import CreateEvent from "./components/CreateEvent";
import Groups from "./components/Groups";
import { getEventsThunk } from "./store/events";
import { getGroupsThunk } from "./store/group"
import UpdateEvent from "./components/UpdateEvent";
import CreateGroup from "./components/CreateGroup";
import Home from "./components/Home";
import EventButton from "./components/EventButton";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const events = useSelector(state => state.events.Events)
  const groups = useSelector(state => state.groups.Groups)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getEventsThunk())
    dispatch(getGroupsThunk())
  }, [dispatch]);

  return (
    <>
      <div className="app" >
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/events">
              <SubNav />
              <Events />
            </Route>
            <Route exact path="/events/:id">
              <EventById />
            </Route>
            <Route exact path="/groups">
              <SubNav />
              <Groups />
              <EventButton />
            </Route>
            <Route exact path="/groups/:groupId/events">
              <CreateEvent />
            </Route>
            <Route exact path="/events/:eventId/edit">
              <UpdateEvent />
            </Route>
            <Route exact path='/groups/create'>
              <CreateGroup />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
