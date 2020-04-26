import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  DashboardRouteComponent,
  SignInRouteComponent,
  SignUpRouteComponent,
  signInRoute,
  dashboardRoute,
  signUpRoute,
} from './config';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={signInRoute.path} component={SignInRouteComponent} exact />
      <Route path={signUpRoute.path} component={SignUpRouteComponent} exact />
      <Route
        path={dashboardRoute.path}
        component={DashboardRouteComponent}
        exact
      />
      <Route component={DashboardRouteComponent} />
    </Switch>
  );
};

const Routes: React.FC = () => {
  return <AppRoutes />;
};

export default Routes;
