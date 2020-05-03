import React, { useMemo } from 'react';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';
import Toolbar from '../Toolbar';

import { Section, Content } from './styles';

const BaseLayout: React.FC = ({ children }) => {
  const { drawerMenuStorageState, metrics } = useDrawerMenu();
  const defaultPadding = 0;
  const drawerMenuClosePadding = useMemo(
    () => metrics.drawerMenuWidthClose + defaultPadding,
    [metrics.drawerMenuWidthClose],
  );

  return (
    <Section
      drawerMenuOpen={drawerMenuStorageState}
      drawerMenuClosePadding={drawerMenuClosePadding}
      drawerMenuOpenPadding={defaultPadding}
    >
      <Toolbar />
      <Content>{children}</Content>
    </Section>
  );
};

export default BaseLayout;
