import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  SortingState,
  PagingState,
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
import { toast } from 'react-toastify';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';
import { useQueryParams } from '../../hooks/QueryParamsContext';
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
  const [pageSizes] = useState([5, 10, 20]);
  const [dataProviderKeys] = useState(
    useMemo(() => columns.map((column) => column.name), [columns]),
  );
  const [rightFixedColumns] = useState([actionColumnName]);
  const [loading, setLoading] = useState(true);
  const { drawerMenuStorageState, metrics } = useDrawerMenu();
  const { params, setParams } = useQueryParams();
  const requestSource = useMemo(() => Request.CancelToken.source(), []);

  const setError = useCallback((message: string): void => {
    toast.error(message);
    setLoading(false);
  }, []);

  const searchRecords = useCallback(async () => {
    try {
      const { url } = requestOptions;
      setLoading(true);
      const response = await Request.get(url.getPath(), {
        cancelToken: requestSource.token,
      });
      setLoading(false);
      setRows(response.data.data);
      setParams({ total: response.data.meta.total });
    } catch (error) {
      if (!Request.isCancel(error)) {
        setError(
          'Não foi possível buscar os dados. Tente novamente mais tarde!',
        );
      }
    }
  }, [requestOptions, requestSource, setParams, setError]);

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

  useEffect(
    () => (): void => {
      requestSource.cancel('Table component unmounted');
    },
    [requestSource],
  );

  useEffect(() => {
    searchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, params.per_page]);

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
            onSortingChange={([newSorting]): void => {
              setParams({
                sort: newSorting.columnName,
                direction: newSorting.direction,
              });
              setSorting([newSorting]);
            }}
          />
          <PagingState
            currentPage={params.page}
            onCurrentPageChange={(newPage): void => {
              setParams({ page: newPage });
            }}
            pageSize={params.per_page}
            onPageSizeChange={(perPage): void => {
              setParams({ per_page: perPage });
            }}
          />
          <CustomPaging totalCount={params.total} />

          <DataTypeProvider
            for={dataProviderKeys}
            formatterComponent={onFormatterComponent}
          />

          <IntegratedSorting />

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
              return (
                <PagingPanelContainer {...props} totalCount={params.total} />
              );
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
