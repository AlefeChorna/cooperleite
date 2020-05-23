import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import DrawerMenu from '../components/DrawerMenu';
import BaseLayout from '../components/BaseLayout';

import { RootTypes } from '../store/types';
import { DrawerMenuProvider } from '../hooks/DrawerMenuContext';
import {
  DashboardRouteComponent,
  SignInRouteComponent,
  SignUpRouteComponent,
  ForgotPasswordRouteComponent,
  signInRoute,
  dashboardRoute,
  signUpRoute,
  forgotPasswordRoute,
} from './config';

interface RoutesProps {
  signed: boolean;
}

const Main = styled.main`
  display: flex;
  flex: 1;
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
        path={dashboardRoute.path}
        component={DashboardRouteComponent}
        exact
      />
      <Route path="/finances" component={DashboardRouteComponent} exact />
      <Route path="/incomes" component={DashboardRouteComponent} exact />
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

const mapStateToProps = (state: RootTypes): { signed: boolean } => ({
  signed: state.auth.signed,
});

export default connect(mapStateToProps)(Routes);
