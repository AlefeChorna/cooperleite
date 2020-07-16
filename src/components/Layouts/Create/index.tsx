import React from 'react';

import LayoutBase from '../Base';
import FooterActions, { FooterActionsProps } from '../../FooterActions';

import { BreadcrumbProps } from '../../../hooks/BreadcrumbsContext';

interface LayoutShowProps {
  breadcrumbs: BreadcrumbProps[];
  footerActionsProps: FooterActionsProps;
}

const Create: React.FC<LayoutShowProps> = ({
  breadcrumbs,
  children,
  footerActionsProps,
}) => {
  return (
    <LayoutBase
      breadcrumbs={breadcrumbs}
      navMenuProps={{
        visible: false,
      }}
    >
      <div style={{ height: 30 }} />
      {children}

      <FooterActions {...footerActionsProps} />
    </LayoutBase>
  );
};

export default Create;
