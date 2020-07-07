import React from 'react';
import { useParams } from 'react-router-dom';

import LayoutShow from '../../components/Layouts/Show';

import {
  animalListRoute,
  animalCreateRoute,
  animalEditRoute,
} from '../../routes/config';

const Show: React.FC = () => {
  const { id } = useParams();

  return (
    <LayoutShow
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Visualizar Animal' },
      ]}
      navMenuProps={{
        newRoute: animalCreateRoute.path,
        editRoute: animalEditRoute.build({ id }),
      }}
    />
  );
};

export { Show };
