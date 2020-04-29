import React, { useMemo } from 'react';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';
import Toolbar from '../Toolbar';

import { Section } from './styles';

const Container: React.FC = ({ children }) => {
  const { drawerMenuStorageState, metrics } = useDrawerMenu();

  return (
    <Section
      drawerMenuOpen={drawerMenuStorageState}
      drawerMenuClosePadding={120}
      drawerMenuOpenPadding={40}
    >
      <Toolbar />
      {children}
    </Section>
  );
};

export default Container;
