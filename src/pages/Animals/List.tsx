import React from 'react';

import LayoutList from '../../components/Layouts/List';

import { animalsRouteApi } from '../../routes/config/api';
import {
  animalCreateRoute,
  animalShowRoute,
  animalEditRoute,
} from '../../routes/config';

const List: React.FC = () => {
  return (
    <LayoutList
      breadcrumbs={[{ text: 'Animais' }]}
      navMenuProps={{
        newRoute: animalCreateRoute.path,
      }}
      tableProps={{
        requestOptions: {
          url: animalsRouteApi,
        },
        columns: [
          { name: 'id', title: 'Código' },
          { name: 'name', title: 'Nome' },
          { name: 'earring_number', title: 'Nº do Brinco' },
          { name: 'gender', title: 'Sexo' },
          { name: 'breed', title: 'Raça' },
          { name: 'weight', title: 'Peso' },
          { name: 'actions', title: 'Actions' },
        ],
        columnsProperties: [
          { columnName: 'id', width: 110 },
          { columnName: 'earring_number', width: 130 },
          { columnName: 'gender', width: 110 },
          { columnName: 'breed', width: 200 },
          { columnName: 'weight', width: 110 },
          { columnName: 'actions', width: 150, align: 'center' },
        ],
        customActions: ({ id }): any => ({
          actions: ['show', 'edit'],
          paths: {
            edit: animalEditRoute.build({ id }),
            show: animalShowRoute.build({ id }),
          },
        }),
        dataTypeProvider: [
          {
            columnName: 'id',
            formatterComponent: ({ row }) => (
              <div>{String(row.id).padStart(6, '0')}</div>
            ),
          },
          {
            columnName: 'earring_number',
            formatterComponent: ({ row }) => (
              <div>{String(row.earring_number).padStart(6, '0')}</div>
            ),
          },
          {
            columnName: 'weight',
            formatterComponent: ({ row }) => <div>{`${row.weight} KG`}</div>,
          },
          {
            columnName: 'gender',
            formatterComponent: ({ row }) => (
              <div>{row.gender === 'M' ? 'Macho' : 'Fêmea'}</div>
            ),
          },
        ],
      }}
    />
  );
};

export { List };
