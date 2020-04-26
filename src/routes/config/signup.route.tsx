import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import SignUp from '../../pages/SignUp';

export const signUpRoute = new Route('/signup');

export const SignUpRouteComponent: React.FC = () => (
  <RouteWrapper path={signUpRoute.path} exact component={SignUp} />
);
