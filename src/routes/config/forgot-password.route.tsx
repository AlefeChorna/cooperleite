import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import ForgotPassword from '../../pages/ForgotPassword';

export const forgotPasswordRoute = new Route('/password/forgot');

export const ForgotPasswordRouteComponent: React.FC = () => (
  <RouteWrapper
    path={forgotPasswordRoute.path}
    exact
    component={ForgotPassword}
  />
);
