import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '../../services/route';
import RouteWrapper from '../RouteWrapper';
import { List } from '../../pages/Animals';

export const animalListRoute = new Route('/animals');

export const animalShowRoute = new Route('/animals/:id/show');

export const animalEditRoute = new Route('/animals/:id/edit');

export const animalCreateRoute = new Route('/animals/new');

export const AnimalsRoutesComponent: React.FC = () => {
  return (
    <Switch>
      {/* <RouteWrapper path={animalShowRoute.path} exact component={Show} isPrivate />
      <RouteWrapper path={animalEditRoute.path} exact component={Edit} isPrivate />
      <RouteWrapper path={animalCreateRoute.path} exact component={Create} isPrivate /> */}

      <RouteWrapper
        path={animalListRoute.path}
        component={List}
        isPrivate
        redirectIfNotExact
      />
    </Switch>
  );
};
