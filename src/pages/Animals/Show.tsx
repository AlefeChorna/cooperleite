import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import LayoutShow from '../../components/Layouts/Show';
import Form from './Form';

import {
  animalListRoute,
  animalCreateRoute,
  animalEditRoute,
} from '../../routes/config';

const Show: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);

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
    >
      <Form formRef={formRef} isShowPage />
    </LayoutShow>
  );
};

export { Show };
