import React, { useState, createContext, useCallback, useContext } from 'react';

export type HTMLAnchorElementEvent = React.MouseEvent<HTMLAnchorElement>;

export interface BreadcrumbProps {
  text: string;
  path?: string;
  onClick?: (
    event: HTMLAnchorElementEvent,
    breadcrumb: {
      text: string;
      path?: string;
    },
  ) => void;
}

export interface BreadCrumbsContextProps {
  breadcrumbs: BreadcrumbProps[];
  setBreadcrumbs(breadcrumb: BreadcrumbProps[]): void;
}

const BreadcrumbsContext = createContext<BreadCrumbsContextProps>(
  {} as BreadCrumbsContextProps,
);

export const BreadcrumbsProvider: React.FC = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const handleSetBreadcrumbs = useCallback((newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  }, []);

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs: handleSetBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = (): BreadCrumbsContextProps => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }

  return context;
};

export default BreadcrumbsContext;
