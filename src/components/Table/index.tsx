import React, { useState, useMemo, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
  EditingState,
  PagingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table as MUITable,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';

import { Container, TableHeaderRow, TableHead } from './styles';

const Table: React.FC = () => {
  const [columns] = useState([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount' },
    { name: 'discount', title: 'Discount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows, setRows] = useState([
    {
      id: 0,
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
    },
    {
      id: 1,
      region: 'North America',
      sector: 'Health',
      channel: 'Telecom',
      units: 4,
      customer: 'Global Services',
      product: 'EnviroCare',
      amount: 9528.65,
      discount: 0.264,
      saleDate: '2016-02-07',
      shipped: true,
    },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'product' },
    { columnName: 'region', width: 180 },
    { columnName: 'amount', width: 180 },
    { columnName: 'discount', width: 180 },
    { columnName: 'saleDate', width: 180 },
    { columnName: 'customer', width: 200 },
  ]);
  const [sorting, setSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
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
  const [totalSummaryItems] = useState([
    { columnName: 'discount', type: 'avg' },
    { columnName: 'amount', type: 'sum' },
  ]);
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
          <SummaryState totalItems={totalSummaryItems} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />

          <DragDropProvider />

          <MUITable
            headComponent={(props) => {
              return (
                <TableHead
                  {...props}
                  style={{
                    backgroundColor: '#29292e',
                    color: '#FFF',
                  }}
                />
              );
            }}
            cellComponent={(props) => {
              return (
                <MUITable.Cell
                  {...props}
                  style={{
                    backgroundColor: '#29292e',
                    color: '#FFF',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                />
              );
            }}
            columnExtensions={tableColumnExtensions}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableSummaryRow />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>
    </Container>
  );
};

export default Table;
