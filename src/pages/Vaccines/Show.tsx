import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import LayoutShow from '../../components/Layouts/Show';
import Form from './Form';

import {
  vaccineListRoute,
  vaccineCreateRoute,
  vaccineEditRoute,
} from '../../routes/config';

const Show: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutShow
      breadcrumbs={[
        { path: vaccineListRoute.path, text: 'Vacinas' },
        { text: 'Visualizar Vacina' },
      ]}
      navMenuProps={{
        newRoute: vaccineCreateRoute.path,
        editRoute: vaccineEditRoute.build({ id }),
      }}
    >
      <Form formRef={formRef} isShowPage />
    </LayoutShow>
  );
};

export { Show };
