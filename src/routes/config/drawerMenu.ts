import { IconBaseProps } from 'react-icons';
import { FiGrid, FiBarChart2 } from 'react-icons/fi';

import { dashboardRoute, financesRoute } from './index';

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
    name: 'Financeiro',
    icon: FiBarChart2,
    collapse: [
      {
        name: 'Despesas',
        to: financesRoute.path,
        collapseFatherName: 'Financeiro',
      },
      {
        name: 'Receitas',
        to: '/incomes',
        collapseFatherName: 'Financeiro',
      },
    ],
  },
];
