import React, { memo } from 'react';

import Spinner from '../../../Spinner';

import { Container } from './styles';

const Loading: React.FC = () => (
  <Container>
    <Spinner
      loadingText="Buscando dados..."
      activeBorderWidth={4.5}
      loadingTextStyle={{
        fontWeight: 'bold',
        color: '#fd951f',
        fontSize: '1.3rem',
      }}
    />
  </Container>
);

export default memo(Loading);
