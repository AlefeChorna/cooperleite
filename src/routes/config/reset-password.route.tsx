import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import ResetPassword from '../../pages/ResetPassword';

export const resetPasswordRoute = new Route('/password/reset');

export const ResetPasswordRouteComponent: React.FC = () => (
  <RouteWrapper
    path={resetPasswordRoute.path}
    exact
    component={ResetPassword}
  />
);
