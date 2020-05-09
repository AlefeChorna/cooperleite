import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import history from '../services/history';
import { store } from '../store';
import { dashboardRoute } from './config';

interface RouteWrapperProps extends RouteProps {
  component: React.FC;
  isPrivate?: boolean;
  redirectIfNotExact?: boolean;
  path: string;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  isPrivate = false,
  redirectIfNotExact = false,
  path,
  ...rest
}) => {
  const { signed } = store.getState().auth;

  const loggedOutUserTryingAccessPrivateRoute = !signed && isPrivate;
  if (loggedOutUserTryingAccessPrivateRoute) {
    return <Redirect to="/" />;
  }

  const loggedUserTryingAccessPublicRoute = signed && !isPrivate;
  if (loggedUserTryingAccessPublicRoute) {
    return <Redirect to={dashboardRoute.path} />;
  }

  const invalidRoute = history.location.pathname !== path;
  const loggedUserTryingAccessUnmappedPrivateRoute =
    signed && isPrivate && invalidRoute;
  if (loggedUserTryingAccessUnmappedPrivateRoute && redirectIfNotExact) {
    return <Redirect to={path} />;
  }

  return <Route {...rest} path={path} component={Component} />;
};

export default RouteWrapper;
