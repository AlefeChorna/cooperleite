import React from 'react';

import LayoutBase from '../Base';
import { NavMenuProps } from '../../NavMenu';

import { BreadcrumbProps } from '../../../hooks/BreadcrumbsContext';

interface LayoutShowProps {
  breadcrumbs: BreadcrumbProps[];
  navMenuProps: NavMenuProps;
}

const Show: React.FC<LayoutShowProps> = ({
  breadcrumbs,
  navMenuProps,
  children,
}) => {
  return (
    <LayoutBase
      breadcrumbs={breadcrumbs}
      navMenuProps={{
        showInputSearch: false,
        ...navMenuProps,
      }}
    >
      {children}
    </LayoutBase>
  );
};

export default Show;
