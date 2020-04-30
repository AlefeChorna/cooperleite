import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import DrawerMenu from '../components/DrawerMenu';
import BaseLayout from '../components/BaseLayout';

import { DrawerMenuProvider } from '../hooks/DrawerMenuContext';
import {
  DashboardRouteComponent,
  SignInRouteComponent,
  SignUpRouteComponent,
  signInRoute,
  dashboardRoute,
  signUpRoute,
} from './config';

const Main = styled.main`
  display: flex;
`;

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
  // if (!signed) {
  //   return (
  //     <Main>
  //       <AppRoutes />
  //     </Main>
  //   );
  // }

  return (
    <Main>
      <DrawerMenuProvider>
        <DrawerMenu />
        <BaseLayout>
          <AppRoutes />
        </BaseLayout>
      </DrawerMenuProvider>
    </Main>
  );
};

export default Routes;
