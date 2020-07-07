import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  CustomPaging,
  IntegratedSorting,
  DataTypeProvider,
  Column,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table as MUITable,
  TableHeaderRow,
  PagingPanel,
  DragDropProvider,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';
import NoDataRow from './components/NoDataRow';
import Loading from './components/Loading';
import Actions, { ActionsProps } from './components/Actions';
import Request from '../../services/request';
import Route from '../../services/route';

import {
  Container,
  Paper,
  TableHead,
  TableCell,
  PagingPanelContainer,
} from './styles';

const actionColumnName = 'actions';

interface ValueFormatterProps {
  column: Column;
  row?: any;
  value: any;
}

export interface TableProps {
  requestOptions: {
    url: Route;
  };
  columns: Column[];
  columnsProperties: MUITable.ColumnExtension[];
  customActions?: (row: any) => ActionsProps;
  dataTypeProvider?: Array<{
    columnName: string;
    formatterComponent(data: ValueFormatterProps): React.FC | any;
  }>;
}

const Table: React.FC<TableProps> = ({
  columns,
  columnsProperties,
  customActions,
  dataTypeProvider,
  requestOptions,
}) => {
  const [rows, setRows] = useState<any>([]);
  const [sorting, setSorting] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 20]);
  const [total, setTotal] = useState(0);
  const [dataProviderKeys] = useState(
    useMemo(() => columns.map((column) => column.name), [columns]),
  );
  const [rightFixedColumns] = useState([actionColumnName]);
  const [loading, setLoading] = useState(true);
  const { drawerMenuStorageState, metrics } = useDrawerMenu();

  useEffect(() => {
    setTimeout(async () => {
      const { url } = requestOptions;
      const response = await Request.get(url.path);
      setLoading(false);
      setRows(response.data.data);
      setTotal(response.data.meta.total);
    }, 1500);
  }, [requestOptions]);

  const getRowId = useCallback((row: any): number => row.id, []);

  const onFormatterComponent = useCallback(
    ({ value, row, column }) => {
      if (column.name === actionColumnName) {
        const actions = customActions && customActions(row);
        return (
          <Actions
            actions={[]}
            paths={{
              show: '',
              edit: '',
            }}
            {...actions}
          />
        );
      }

      if (dataTypeProvider) {
        const [columnOverride] = dataTypeProvider.filter(
          (colOver) => colOver.columnName === column.name,
        );

        if (columnOverride) {
          const { formatterComponent } = columnOverride;
          return formatterComponent({ value, row, column });
        }
      }

      return <div>{value}</div>;
    },
    [customActions, dataTypeProvider],
  );

  const searchRecords = useCallback(() => {}, []);

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
            onSortingChange={(newSorting): void => setSorting(newSorting)}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />

          <DataTypeProvider
            for={dataProviderKeys}
            formatterComponent={onFormatterComponent}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <DragDropProvider />

          <MUITable
            columnExtensions={columnsProperties}
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
          <TableHeaderRow showSortingControls />
          <TableFixedColumns rightColumns={rightFixedColumns} />
          <PagingPanel
            containerComponent={({ totalCount, ...props }): any => {
              return <PagingPanelContainer {...props} totalCount={total} />;
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
