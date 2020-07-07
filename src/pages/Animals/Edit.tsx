import React from 'react';

import LayoutEdit from '../../components/Layouts/Edit';

import { animalListRoute, animalCreateRoute } from '../../routes/config';

const Edit: React.FC = () => {
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
    />
  );
};

export { Edit };
