import React from 'react';

import LayoutList from '../../components/Layouts/List';

import { vaccinesRouteApi } from '../../routes/config/api';
import {
  vaccineCreateRoute,
  vaccineShowRoute,
  vaccineEditRoute,
} from '../../routes/config';

const List: React.FC = () => {
  return (
    <LayoutList
      breadcrumbs={[{ text: 'Vacinas' }]}
      navMenuProps={{
        newRoute: vaccineCreateRoute.path,
      }}
      tableProps={{
        requestOptions: {
          url: vaccinesRouteApi,
        },
        columns: [
          { name: 'id', title: 'Código' },
          { name: 'name', title: 'Nome' },
          { name: 'actions', title: 'Actions' },
        ],
        columnsProperties: [
          { columnName: 'id', width: 110 },
          { columnName: 'actions', width: 150, align: 'center' },
        ],
        customActions: ({ id }): any => ({
          actions: ['show', 'edit'],
          paths: {
            edit: vaccineEditRoute.build({ id }),
            show: vaccineShowRoute.build({ id }),
          },
        }),
        dataTypeProvider: [
          {
            columnName: 'id',
            formatterComponent: ({ row }) => (
              <div>{String(row.id).padStart(6, '0')}</div>
            ),
          },
        ],
      }}
    />
  );
};

export { List };
