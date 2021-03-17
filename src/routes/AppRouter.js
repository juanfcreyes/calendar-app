import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
          <Switch>
            <Route exact={true} path="/login">
              <LoginScreen />
            </Route>
            <Route exact={true} path="/">
              <CalendarScreen />
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
      </Router>
    )
}
