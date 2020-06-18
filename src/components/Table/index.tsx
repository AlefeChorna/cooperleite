import React, { useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table as MUITable,
  TableHeaderRow,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';
import NoDataRow from './components/NoDataRow';

import {
  Container,
  TableHead,
  TableCell,
  PagingPanelContainer,
} from './styles';

function generateData() {
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      region: 'South America',
      sector: 'Banking',
      channel: 'VARs',
      units: 4,
      customer: 'Beacon Systems',
      product: 'EnviroCare Max',
      amount: 46522.35,
      discount: 0.279,
      saleDate: '2016-02-28',
      shipped: false,
    });
  }

  return data;
}

const Table: React.FC = () => {
  const [columns] = useState([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount' },
    { name: 'discount', title: 'Discount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'product' },
    { columnName: 'region', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'discount', width: 180 },
    { columnName: 'saleDate', width: 180 },
    { columnName: 'customer', width: 200 },
  ]);
  const [sorting, setSorting] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 0]);
  const [columnOrder, setColumnOrder] = useState([
    'product',
    'region',
    'amount',
    'discount',
    'saleDate',
    'customer',
  ]);
  const [currencyColumns] = useState(['amount']);
  const [percentColumns] = useState(['discount']);
  const [leftFixedColumns] = useState(['customer']);
  const { drawerMenuStorageState } = useDrawerMenu();

  const getRowId = useCallback((row: any): number => row.id, []);

  return (
    <Container drawerMenuOpen={drawerMenuStorageState}>
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <SortingState
            sorting={sorting}
            onSortingChange={(): void => {
              console.log('chaaa... sorting >>');
            }}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <DragDropProvider />

          <MUITable
            columnExtensions={tableColumnExtensions}
            headComponent={TableHead}
            cellComponent={(props): any => {
              return <TableCell {...props} />;
            }}
            noDataRowComponent={({ children }): any => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              <NoDataRow loading={false} colSpan={children?.length || 0} />
            )}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel
            containerComponent={(props): any => {
              return <PagingPanelContainer {...props} />;
            }}
            messages={{
              showAll: 'Tudo',
              rowsPerPage: 'Registros por página',
              info: ({ from, to, count }) => `${from}-${to} de ${count}`,
            }}
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default Table;
