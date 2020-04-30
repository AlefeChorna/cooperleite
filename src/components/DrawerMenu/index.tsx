import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FiAlignRight, FiInbox, FiMail } from 'react-icons/fi';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useDrawerMenu } from '../../hooks/DrawerMenuContext';

import { Container, Root, EmptyListItem, Drawer, AppBar } from './styles';

const DrawerMenu: React.FC = () => {
  const {
    open,
    drawerMenuStorageState,
    toogleDrawerMenu,
    onMouseAction,
    metrics,
  } = useDrawerMenu();

  return (
    <Container drawerOpen={drawerMenuStorageState}>
      <Root>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toogleDrawerMenu}
              edge="start"
            >
              <FiAlignRight size={25} color="#FFF" />
            </IconButton>
            <Typography variant="h6" noWrap>
              Cooperleite
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          drawerOpen={open}
          drawerWidthOpen={metrics.drawerMenuWidthOpen}
          drawerWidthClose={metrics.drawerMenuWidthClose}
          onFocus={(): void => onMouseAction(true)}
          onMouseOver={(): void => onMouseAction(true)}
          onMouseLeave={(): void => onMouseAction(false)}
        >
          <EmptyListItem />
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text} style={{ marginLeft: 9 }}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <FiInbox size={19} color="#FFF" />
                  ) : (
                    <FiMail size={19} color="#FFF" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: '#FFF' }} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text} style={{ marginLeft: 9 }}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <FiInbox size={19} color="#FFF" />
                  ) : (
                    <FiMail size={19} color="#FFF" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: '#FFF' }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Root>
    </Container>
  );
};

export default DrawerMenu;
