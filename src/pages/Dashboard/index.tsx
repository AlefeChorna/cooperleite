import React from 'react';
import Button from '@material-ui/core/Button';

import DrawerMenu from '../../components/DrawerMenu';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Welcome to Dashboard</h1>
      <DrawerMenu />
    </Container>
  );
};

export default Dashboard;
