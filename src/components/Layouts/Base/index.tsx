import React, { useEffect } from 'react';

import NavMenu, { NavMenuProps } from '../../NavMenu';
import Breadcrumbs from '../../Breadcrumbs';

import {
  useBreadcrumbs,
  BreadcrumbProps,
} from '../../../hooks/BreadcrumbsContext';
import { dashboardRoute } from '../../../routes/config';

import { Container } from './styles';

interface LayoutListProps {
  breadcrumbs?: BreadcrumbProps[];
  navMenuProps: NavMenuProps & {
    visible?: boolean;
  };
}

const Base: React.FC<LayoutListProps> = ({
  breadcrumbs = [],
  navMenuProps,
  children,
}) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { path: dashboardRoute.path, text: 'Início' },
      ...breadcrumbs,
    ]);
  }, [setBreadcrumbs, breadcrumbs]);

  const { visible = true, ...restNavMenuProps } = navMenuProps;
  return (
    <Container>
      <Breadcrumbs />
      {visible && <NavMenu showInputSearch {...restNavMenuProps} />}

      {children}
    </Container>
  );
};

export default Base;
