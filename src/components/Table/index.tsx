import React, { useState, useCallback, useEffect } from 'react';
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
import Loading from './components/Loading';

import {
  Container,
  Paper,
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
  const [rows, setRows] = useState<any>([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'product' },
    { columnName: 'region', width: 380 },
    { columnName: 'amount', width: 180 },
    { columnName: 'discount', width: 180 },
    { columnName: 'saleDate', width: 180 },
    { columnName: 'customer', width: 250 },
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
  const [rightFixedColumns] = useState(['customer']);
  const { drawerMenuStorageState, metrics } = useDrawerMenu();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const rowsData = generateData();
      setRows(rowsData);
      setLoading(false);
    }, 1500);
  }, []);

  const getRowId = useCallback((row: any): number => row.id, []);

  return (
    <Container
      drawerMenuOpen={drawerMenuStorageState}
      drawerMenuWidthOpen={metrics.drawerMenuWidthOpen}
      drawerMenuWidthClose={metrics.drawerMenuWidthClose}
    >
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
              <NoDataRow loading={loading} colSpan={children?.length || 0} />
            )}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableFixedColumns rightColumns={rightFixedColumns} />
          <PagingPanel
            containerComponent={(props): any => {
              return <PagingPanelContainer {...props} />;
            }}
            messages={{
              showAll: 'Tudo',
              rowsPerPage: 'Registros por página',
              info: ({ from, to, count }): string =>
                `${from}-${to} de ${count}`,
            }}
            pageSizes={pageSizes}
          />
        </Grid>

        {loading && <Loading />}
      </Paper>
    </Container>
  );
};

export default Table;
