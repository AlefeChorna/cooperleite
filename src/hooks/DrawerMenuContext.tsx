import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';

interface DrawerMenuMetrics {
  drawerMenuWidthOpen: number;
  drawerMenuWidthClose: number;
}

interface DrawerMenuContextProps {
  metrics: DrawerMenuMetrics;
  drawerMenuStorageState: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toogleDrawerMenu(): void;
  onMouseAction(openDrawer: boolean): void;
}

const drawerMenuMetrics: DrawerMenuMetrics = {
  drawerMenuWidthOpen: 250,
  drawerMenuWidthClose: 73,
};

const DrawerMenuContext = createContext<DrawerMenuContextProps>(
  {} as DrawerMenuContextProps,
);

const DRAWER_MENU_STORAGE_STATE = '@Cooperleite/state/drawerMenuState';

export const DrawerMenuProvider: React.FC = ({ children }) => {
  const getDrawerStorageState = useCallback(() => {
    const drawerMenuOpen = localStorage.getItem(DRAWER_MENU_STORAGE_STATE);

    return drawerMenuOpen !== 'closed';
  }, []);

  const [drawerMenuStorageState, setDrawerStorageState] = useState(
    getDrawerStorageState(),
  );
  const [open, setOpen] = useState(getDrawerStorageState());

  const toogleDrawerMenu = useCallback((): void => {
    setOpen((oldState) => !oldState);
    setDrawerStorageState((oldState) => {
      localStorage.setItem(
        DRAWER_MENU_STORAGE_STATE,
        !oldState ? 'opened' : 'closed',
      );

      return !oldState;
    });
  }, []);

  const onMouseAction = useCallback(
    (openDrawer) => {
      // Open/Close Drawer on mouseOver/mouseLeave event
      if (!drawerMenuStorageState && openDrawer !== open) {
        setOpen(openDrawer);
      }
    },
    [drawerMenuStorageState, open],
  );

  return (
    <DrawerMenuContext.Provider
      value={{
        metrics: drawerMenuMetrics,
        drawerMenuStorageState,
        open,
        toogleDrawerMenu,
        setOpen,
        onMouseAction,
      }}
    >
      {children}
    </DrawerMenuContext.Provider>
  );
};

export const useDrawerMenu = (): DrawerMenuContextProps => {
  const context = useContext(DrawerMenuContext);

  if (!context) {
    throw new Error('useDrawerMenu must be used within a DrawerMenuProvider');
  }

  return context;
};

export default DrawerMenuContext;
