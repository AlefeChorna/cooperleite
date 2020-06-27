import styled from 'styled-components';
import MUMenu from '@material-ui/core/Menu';
import MUListItemIcon from '@material-ui/core/ListItemIcon';
import MUMenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0px 25px 35px;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

export const OptionsButton = styled(Button)`
  margin-right: 15px !important;
  background-color: #29292e !important;
  color: #fb3bc9 !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #555 !important;

  &:hover {
    background-color: rgb(251, 251, 251);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ListItemIcon = styled(MUListItemIcon)`
  min-width: 36px !important;
`;

export const MenuItem = styled(MUMenuItem)`
  &:focus {
    background-color: #ff3bc9 !important;
    & .MuiListItemIcon-root,
    & .MuiListItemText-primary {
      color: #fff;
    }
  }
`;

export const Menu = styled(MUMenu).attrs({
  elevation: 0,
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
})`
  margin-top: 5px;
  & .MuiMenu-paper {
    background-color: #29292e;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.7), 0 5px 8px -2px rgba(0, 0, 0, 0.5);

    ul {
      color: #fff !important;
      font-weight: 600 !important;

      svg {
        color: #fff;
      }

      li:hover {
        background-color: #202020;
      }
    }
  }
`;
