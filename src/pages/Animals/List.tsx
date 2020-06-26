import React from 'react';

import Table from '../../components/Table';
import NavMenu from '../../components/NavMenu';

import { animalsRouteApi } from '../../routes/config/api';

import { Container } from './styles';

const List: React.FC = () => {
  return (
    <Container>
      <NavMenu />
      <Table
        requestOptions={{
          url: animalsRouteApi,
        }}
        columns={[
          { name: 'id', title: '#' },
          { name: 'name', title: 'Nome' },
          { name: 'breed', title: 'Raça' },
          { name: 'weight', title: 'Peso' },
          { name: 'gender', title: 'Sexo' },
          { name: 'actions', title: 'Actions' },
        ]}
        columnsProperties={[
          { columnName: 'id', width: 100, align: 'center' },
          { columnName: 'breed', width: 200 },
          { columnName: 'weight', width: 110 },
          { columnName: 'gender', width: 110 },
          { columnName: 'actions', width: 150, align: 'center' },
        ]}
        customActions={(rowData) => ({
          actions: ['show', 'edit'],
          paths: {
            edit: `edit/${rowData.id}`,
            show: `show/${rowData.id}`,
          },
        })}
        dataTypeProvider={[
          {
            columnName: 'id',
            formatterComponent: ({ row }) => (
              <div>{String(row.id).padStart(6, '0')}</div>
            ),
          },
          {
            columnName: 'weight',
            formatterComponent: ({ row }) => <div>{`${row.weight} KG`}</div>,
          },
          {
            columnName: 'gender',
            formatterComponent: ({ row }) => (
              <div>{row.gender === 'M' ? 'Masculino' : 'Femenino'}</div>
            ),
          },
        ]}
      />
    </Container>
  );
};

export { List };
