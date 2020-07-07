import React from 'react';

import LayoutCreate from '../../components/Layouts/Create';

import { animalListRoute } from '../../routes/config';

const Create: React.FC = () => {
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
    />
  );
};

export { Create };
