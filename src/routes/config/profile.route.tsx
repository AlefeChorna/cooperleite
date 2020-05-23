import React from 'react';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import Profile from '../../pages/Profile';

export const profileRoute = new Route('/profile');

export const ProfileRouteComponent: React.FC = () => (
  <RouteWrapper path={profileRoute.path} exact component={Profile} isPrivate />
);
