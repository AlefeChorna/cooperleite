import React from 'react';
import clsx from 'clsx';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
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

import { Container } from './styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: '#29292e',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
    drawerClose: {
      backgroundColor: '#29292e',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      height: 10,
    },
    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#100f12',
      padding: theme.spacing(3),
    },
  }),
);

const DrawerMenu: React.FC = () => {
  const {
    open,
    drawerMenuStorageState,
    toogleDrawerMenu,
    onMouseAction,
  } = useDrawerMenu();
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Container drawerOpen={drawerMenuStorageState}>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
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
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onFocus={(): void => onMouseAction(true)}
          onMouseOver={(): void => onMouseAction(true)}
          onMouseLeave={(): void => onMouseAction(false)}
        >
          <div className={classes.toolbar} />
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
        {/* <main className={classes.content}>
          <div className={classes.toolbar} />
        </main> */}
      </div>
    </Container>
  );
};

export default DrawerMenu;
