import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import Dashboard from '../../pages/Dashboard';

export const dashboardRoute = new Route('/dashboard');

export const DashboardRouteComponent: React.FC = () => (
  <RouteWrapper
    path={dashboardRoute.path}
    exact
    component={Dashboard}
    isPrivate
  />
);
