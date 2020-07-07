import React from 'react';

import LayoutBase from '../Base';
import { NavMenuProps } from '../../NavMenu';
import FooterActions, { FooterActionsProps } from '../../FooterActions';

import { BreadcrumbProps } from '../../../hooks/BreadcrumbsContext';

interface LayoutShowProps {
  breadcrumbs: BreadcrumbProps[];
  navMenuProps: NavMenuProps;
  footerActionsProps: FooterActionsProps;
}

const Edit: React.FC<LayoutShowProps> = ({
  breadcrumbs,
  navMenuProps,
  children,
  footerActionsProps,
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

      <FooterActions {...footerActionsProps} />
    </LayoutBase>
  );
};

export default Edit;
