import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  useMemo,
} from 'react';

import Route from '../services/route';

interface Params {
  page: number;
  per_page: number;
  sort: string;
  direction: 'asc' | 'desc';
  total: number;
}

interface SetParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
  total?: number;
}

interface QueryParamsContextProps {
  params: Params;
  setParams(params: SetParams): void;
}

const QueryParamsContext = createContext({} as QueryParamsContextProps);
const initialParams: Params = {
  page: 0,
  per_page: 5,
  sort: 'id',
  direction: 'desc',
  total: 0,
};

const currentQueryParams = initialParams;

export const QueryParamsProvider: React.FC = ({ children }) => {
  const [params, setQueryParams] = useState(initialParams);
  const route = useMemo(() => new Route('/'), []);

  const setRouteParams = useCallback(
    (newParams: any) => {
      if ('total' in newParams) {
        delete newParams.total;
      }

      route.setParams({ params: newParams });
    },
    [route],
  );

  const setParams = useCallback(
    (newParams: SetParams) => {
      const currentParams = { ...currentQueryParams };

      Object.assign(currentParams, newParams);

      setRouteParams({ ...currentParams });
      setQueryParams(currentParams);
    },
    [setRouteParams],
  );

  useEffect(() => {
    Object.assign(currentQueryParams, { ...params });
  }, [params]);

  useLayoutEffect(() => {
    const urlParams = Route.getCurrentUrlParams();
    const newParams = currentQueryParams;

    Object.keys(urlParams).map((param: string): any => {
      if (param in currentQueryParams) {
        const toInt = ['page', 'per_page', 'size'].includes(param);
        Object.assign(newParams, {
          [param]: toInt ? Number(urlParams[param]) : urlParams[param],
        });
      }
    });

    setParams(newParams);
  }, [setParams]);

  return (
    <QueryParamsContext.Provider value={{ params, setParams }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParams = (): QueryParamsContextProps => {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }

  return context;
};

export default QueryParamsContext;
