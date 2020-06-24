import React from 'react';
import { IconBaseProps } from 'react-icons';
import { FiGrid, FiBarChart2 } from 'react-icons/fi';
import { GiCow } from 'react-icons/gi';

import { dashboardRoute, animalListRoute } from './index';

interface CollapseItem {
  name: string;
  to: string;
  collapseFatherName: string;
}

interface DrawerMenuItems {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  to?: string;
  collapse?: CollapseItem[];
}

export type DrawerMenuItemProps = DrawerMenuItems & CollapseItem;

export const drawerMenuItems: DrawerMenuItems[] = [
  {
    name: 'Dashboard',
    icon: FiGrid,
    to: dashboardRoute.path,
  },
  {
    name: 'Animais',
    icon: () => <GiCow size={23} color="#FFF" />,
    collapse: [
      {
        name: 'Rebanho',
        to: animalListRoute.path,
        collapseFatherName: 'Animais',
      },
      {
        name: 'Vacinas',
        to: '/incomes',
        collapseFatherName: 'Animais',
      },
    ],
  },
];
