import React from 'react';
import { useParams } from 'react-router-dom';

import NavMenu from '../../components/NavMenu';
import FooterActions from '../../components/FooterActions';

import { animalCreateRoute, animalEditRoute } from '../../routes/config';

import { Container } from './styles';

const Show: React.FC = () => {
  const { id } = useParams();

  return (
    <Container>
      <NavMenu
        newRoute={animalCreateRoute.path}
        editRoute={animalEditRoute.build({ id })}
      />
      <FooterActions />
    </Container>
  );
};

export { Show };
