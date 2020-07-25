import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import { List, Show, Create, Edit } from '../../pages/Vaccines';

export const vaccineListRoute = new Route('/vaccines');

export const vaccineShowRoute = new Route('/vaccines/:id/show');

export const vaccineEditRoute = new Route('/vaccines/:id/edit');

export const vaccineCreateRoute = new Route('/vaccines/new');

export const VaccinesRoutesComponent: React.FC = () => {
  return (
    <Switch>
      <RouteWrapper
        path={vaccineShowRoute.path}
        exact
        component={Show}
        isPrivate
      />
      <RouteWrapper
        path={vaccineEditRoute.path}
        exact
        component={Edit}
        isPrivate
      />
      <RouteWrapper
        path={vaccineCreateRoute.path}
        exact
        component={Create}
        isPrivate
      />

      <RouteWrapper
        path={vaccineListRoute.path}
        component={List}
        isPrivate
        redirectIfNotExact
      />
    </Switch>
  );
};
