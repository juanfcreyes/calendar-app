import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRouter } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch]);

  const auth = useSelector(state => state.auth);

  if (auth.checking) {
    return (<h1>Espere...</h1> );
  }

  return (
      <Router>
        <Switch>
          <PrivateRouter exact={true} path="/" isAuthenticated={!!auth.user} component={CalendarScreen}>
          </PrivateRouter>
          <PublicRoute exact={true} path="/login" isAuthenticated={!!auth.user} component={LoginScreen}>
          </PublicRoute>
          <Redirect to="/"></Redirect>
        </Switch>
    </Router>
  )
}
