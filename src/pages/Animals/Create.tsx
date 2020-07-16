import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';

import LayoutCreate from '../../components/Layouts/Create';
import Form from './Form';

import { animalListRoute } from '../../routes/config';

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutCreate
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Cadastrar Animal' },
      ]}
      footerActionsProps={{
        onCancelRoute: animalListRoute.path,
        onSubmit: () => alert('Creating...'),
      }}
    >
      <Form formRef={formRef} />
    </LayoutCreate>
  );
};

export { Create };
