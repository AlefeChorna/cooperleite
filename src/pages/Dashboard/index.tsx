import React from 'react';

import Spinner from '../../components/Spinner';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Dashboard;
