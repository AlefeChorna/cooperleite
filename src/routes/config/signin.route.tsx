import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import SignIn from '../../pages/SignIn';

export const signInRoute = new Route('/');

export const SignInRouteComponent: React.FC = () => (
  <RouteWrapper path={signInRoute.path} exact component={SignIn} />
);
