import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';

import LayoutEdit from '../../components/Layouts/Edit';
import Form from './Form';

import { animalListRoute, animalCreateRoute } from '../../routes/config';

const Edit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutEdit
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Editar Animal' },
      ]}
      navMenuProps={{
        newRoute: animalCreateRoute.path,
      }}
      footerActionsProps={{
        onCancelRoute: animalListRoute.path,
        onSubmit: () => alert('Editing...'),
      }}
    >
      <Form formRef={formRef} />
    </LayoutEdit>
  );
};

export { Edit };
