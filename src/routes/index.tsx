import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import DrawerMenu from '../components/DrawerMenu';
import BaseLayout from '../components/BaseLayout';

import { StoreStateTypes } from '../store/types';
import { DrawerMenuProvider } from '../hooks/DrawerMenuContext';
import {
  DashboardRouteComponent,
  SignInRouteComponent,
  SignUpRouteComponent,
  ForgotPasswordRouteComponent,
  ResetPasswordRouteComponent,
  ProfileRouteComponent,
  AnimalsRoutesComponent,
  VaccinesRoutesComponent,
  signInRoute,
  dashboardRoute,
  signUpRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  profileRoute,
  animalListRoute,
  vaccineListRoute,
} from './config';

interface RoutesProps {
  signed: boolean;
}

const Main = styled.main`
  display: flex;
  flex: 1;
  overflow-x: hidden;
`;

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={signInRoute.path} component={SignInRouteComponent} exact />
      <Route path={signUpRoute.path} component={SignUpRouteComponent} exact />
      <Route
        path={forgotPasswordRoute.path}
        component={ForgotPasswordRouteComponent}
        exact
      />
      <Route
        path={resetPasswordRoute.path}
        component={ResetPasswordRouteComponent}
        exact
      />
      <Route
        path={dashboardRoute.path}
        component={DashboardRouteComponent}
        exact
      />
      <Route path={profileRoute.path} component={ProfileRouteComponent} exact />
      <Route path={animalListRoute.path} component={AnimalsRoutesComponent} />
      <Route path={vaccineListRoute.path} component={VaccinesRoutesComponent} />
      <Route component={DashboardRouteComponent} />
    </Switch>
  );
};

const Routes: React.FC<RoutesProps> = ({ signed }) => {
  if (!signed) {
    return <AppRoutes />;
  }

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

const mapStateToProps = (state: StoreStateTypes): { signed: boolean } => ({
  signed: state.auth.signed,
});

export default connect(mapStateToProps)(Routes);
