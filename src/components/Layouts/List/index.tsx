import React from 'react';

import Table, { TableProps } from '../../Table';
import { NavMenuProps } from '../../NavMenu';
import LayoutBase from '../Base';

import { BreadcrumbProps } from '../../../hooks/BreadcrumbsContext';

interface LayoutListProps {
  breadcrumbs: BreadcrumbProps[];
  navMenuProps: NavMenuProps;
  tableProps: TableProps;
}

const List: React.FC<LayoutListProps> = ({
  breadcrumbs,
  navMenuProps,
  tableProps,
  children,
}) => {
  return (
    <LayoutBase breadcrumbs={breadcrumbs} navMenuProps={navMenuProps}>
      <Table {...tableProps} />

      {children}
    </LayoutBase>
  );
};

export default List;
