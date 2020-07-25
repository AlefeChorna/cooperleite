import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { FiAlignRight } from 'react-icons/fi';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';

import {
  drawerMenuItems,
  DrawerMenuItemProps,
} from '../../routes/config/drawerMenu';
import { dashboardRoute } from '../../routes/config';
import Profile from './Profile';
import ListItemLink from './ListItemLink';

import { Container, Root, EmptyListItem, Drawer, AppBar } from './styles';

const ROOT_ROUTE = '/';

const DrawerMenu: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState(new Map());
  const [selectedCollapsedItems, setSelectedCollapsedItems] = useState(
    new Map(),
  );
  const { location } = useHistory();
  const {
    open,
    drawerMenuStorageState,
    toogleDrawerMenu,
    onMouseAction,
    metrics,
  } = useDrawerMenu();

  const isSelected = useCallback(
    (itemRoute: string) => {
      if (!itemRoute) return false;

      if (location.pathname === ROOT_ROUTE) {
        const isDashboardRoute = itemRoute === dashboardRoute.path;
        return isDashboardRoute;
      }

      return location.pathname.startsWith(itemRoute);
    },
    [location.pathname],
  );

  const toogleCollapsedItem = useCallback((itemName: string) => {
    if (!itemName) return;

    setSelectedCollapsedItems((oldState) => {
      const newSelectedCollapsedItems = new Map(oldState);
      const currentColapsedItemValue = !!oldState.get(itemName);

      newSelectedCollapsedItems.set(itemName, !currentColapsedItemValue);
      return newSelectedCollapsedItems;
    });
  }, []);

  const updateSelectedItem = useCallback(
    (itemName: string, collapseFatherName?: string) => {
      const newSelectedItems = new Map();

      newSelectedItems.set(itemName, true);

      if (collapseFatherName) {
        newSelectedItems.set(collapseFatherName, true);
      }

      setSelectedItems(newSelectedItems);
    },
    [],
  );

  const handleClick = useCallback(
    (itemName: string, collapseName?: string, isCollapsible?: boolean) => {
      if (isCollapsible) {
        toogleCollapsedItem(itemName);
        return;
      }

      updateSelectedItem(itemName, collapseName);
    },
    [toogleCollapsedItem, updateSelectedItem],
  );

  const currentSelectedItem = useCallback((): DrawerMenuItemProps => {
    let selectedItem: any = {};

    for (const drawerItem of drawerMenuItems) {
      const itemIsSelected = isSelected(drawerItem.to || '');

      if (itemIsSelected) {
        selectedItem = drawerItem;
        break;
      } else if (drawerItem.collapse) {
        let collapsedItemIsSelected = false;

        for (const collapseItem of drawerItem.collapse) {
          collapsedItemIsSelected = isSelected(collapseItem.to);

          if (collapsedItemIsSelected) {
            selectedItem = collapseItem;
            break;
          }
        }

        if (collapsedItemIsSelected) break;
      }
    }

    const formattedItem: DrawerMenuItemProps = {
      ...selectedItem,
      to: selectedItem.to || '',
    };

    return formattedItem;
  }, [isSelected]);

  const closeColapsedItems = useCallback(
    (drawerOpen?: boolean) => {
      const collapsedItemName = currentSelectedItem();
      const newColapsedItems = new Map();

      selectedCollapsedItems.forEach((value, key) => {
        if (!!drawerOpen && key === collapsedItemName) {
          newColapsedItems.set(key, true);
        } else {
          newColapsedItems.set(key, false);
        }
      });

      setSelectedCollapsedItems(newColapsedItems);
    },
    [currentSelectedItem, selectedCollapsedItems],
  );

  const handleMouseAction = useCallback(
    (openDrawer) => {
      onMouseAction(openDrawer);

      if (!drawerMenuStorageState && !openDrawer) {
        closeColapsedItems();
      }

      if (!drawerMenuStorageState && openDrawer && !open) {
        const collapsedItem = currentSelectedItem();

        if (collapsedItem) {
          toogleCollapsedItem(collapsedItem.collapseFatherName);
        }
      }
    },
    [
      closeColapsedItems,
      currentSelectedItem,
      drawerMenuStorageState,
      onMouseAction,
      open,
      toogleCollapsedItem,
    ],
  );

  const handleToogleMenu = useCallback(() => {
    if (open) {
      setSelectedCollapsedItems(() => new Map());
    } else {
      const currentItem = currentSelectedItem();

      if (currentItem.collapseFatherName) {
        toogleCollapsedItem(currentItem.collapseFatherName);
      }
    }

    toogleDrawerMenu();
  }, [currentSelectedItem, open, toogleCollapsedItem, toogleDrawerMenu]);

  useEffect(() => {
    const currentItem = currentSelectedItem();

    if (drawerMenuStorageState && currentItem.collapseFatherName) {
      toogleCollapsedItem(currentItem.collapseFatherName);
    }

    updateSelectedItem(currentItem.name, currentItem.collapseFatherName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container drawerOpen={drawerMenuStorageState}>
      <Root>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToogleMenu}
              edge="start"
            >
              <FiAlignRight size={25} color="#FFF" />
            </IconButton>
            <Typography variant="h6" noWrap>
              Cooperleite
            </Typography>
            <Profile />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          drawerOpen={open}
          drawerWidthOpen={metrics.drawerMenuWidthOpen}
          drawerWidthClose={metrics.drawerMenuWidthClose}
          onFocus={(): void => handleMouseAction(true)}
          onMouseOver={(): void => handleMouseAction(true)}
          onMouseLeave={(): void => handleMouseAction(false)}
        >
          <EmptyListItem />
          <List>
            {drawerMenuItems.map((item) => (
              <ul key={item.name} style={{ padding: '0' }}>
                <ListItemLink
                  selected={selectedItems.get(item.name)}
                  name={item.name}
                  icon={item.icon}
                  to={item.to}
                  isCollapsible={!!item.collapse}
                  collapseIsOpen={selectedCollapsedItems.get(item.name)}
                  onClick={(): void =>
                    handleClick(item.name, '', !!item.collapse)}
                />
                {item.collapse && (
                  <Collapse
                    in={selectedCollapsedItems.get(item.name)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.collapse.map((colItem) => (
                        <ListItemLink
                          key={colItem.name}
                          name={colItem.name}
                          to={colItem.to}
                          selected={selectedItems.get(colItem.name)}
                          isCollapsibleItem
                          onClick={(): void =>
                            handleClick(
                              colItem.name,
                              colItem.collapseFatherName,
                            )}
                        />
                      ))}
                    </List>
                  </Collapse>
                )}
              </ul>
            ))}
          </List>
        </Drawer>
      </Root>
    </Container>
  );
};

export default DrawerMenu;
