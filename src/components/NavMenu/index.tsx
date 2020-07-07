import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { MdEdit } from 'react-icons/md';
import CloneIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Buttom from '@material-ui/core/Button';

import InputSearch from '../InputSearch';

import {
  Container,
  Link,
  OptionsButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from './styles';

export interface NavMenuProps {
  newRoute?: string;
  editRoute?: string;
  optionsButton?: {
    visible: boolean;
    cloneRoute?: string;
    deleteRoute?: string;
  };
  showInputSearch?: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({
  newRoute,
  editRoute,
  optionsButton,
  showInputSearch,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpenMenuOptions(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenuOptions() {
    setAnchorEl(null);
  }

  return (
    <Container>
      {!!showInputSearch && (
        <InputSearch
          onSubmit={() => {}}
          containerStyle={{ marginRight: 25 }}
          iconColor="#fd951f"
        />
      )}

      {optionsButton?.visible && (
        <OptionsButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="inherit"
          onClick={handleOpenMenuOptions}
          endIcon={<ArrowDropDownIcon style={{ fontSize: 24 }} />}
        >
          Opções
        </OptionsButton>
      )}
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenuOptions}
      >
        {optionsButton?.cloneRoute && (
          <Link to={optionsButton?.cloneRoute}>
            <MenuItem onClick={handleCloseMenuOptions}>
              <ListItemIcon>
                <CloneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Clonar" />
            </MenuItem>
          </Link>
        )}

        {optionsButton?.deleteRoute && (
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Excluir" />
          </MenuItem>
        )}
      </Menu>

      {!!editRoute && (
        <Link to={editRoute}>
          <Buttom
            startIcon={<MdEdit style={{ fontSize: 18, marginBottom: 3 }} />}
            variant="contained"
            style={{
              backgroundColor: '#fd951f',
              color: '#fff',
              marginRight: 15,
              padding: '5px 20px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Editar
            </span>
          </Buttom>
        </Link>
      )}

      {!!newRoute && (
        <Link to={newRoute}>
          <Buttom
            style={{
              backgroundColor: '#4ab46e',
              color: '#fff',
              padding: '5px 20px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Novo registro
            </span>
          </Buttom>
        </Link>
      )}
    </Container>
  );
};

export default NavMenu;
