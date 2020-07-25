import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import { FiLogIn } from 'react-icons/fi';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';

import { StoreStateTypes } from '../../../store/types';
import { profileRoute } from '../../../routes/config';
import { signOut } from '../../../store/modules/auth/actions';
import noProfileIcon from '../../../assets/no-profile.svg';

import { Container, Info, PopoverContent } from './styles';

const Profile: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null,
  );
  const { profile } = useSelector((state: StoreStateTypes) => state.user);
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>): void => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container popoverOpen={open ? 1 : 0}>
      <a aria-describedby={id} onClick={handleClick}>
        <Info>
          <strong>{profile.name}</strong>
          <p>{profile.role ?? 'Administrador'}</p>
        </Info>

        <Avatar src={profile.avatar_url || noProfileIcon} />
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{
          zIndex: 3000,
          marginTop: 7,
        }}
      >
        <PopoverContent>
          <Link to={profileRoute.path} onClick={handleClose}>
            <RiAccountCircleLine size={19} />
            <span>Minha conta</span>
          </Link>
          <a onClick={(): any => dispatch(signOut())}>
            <FiLogIn />
            <span>Sair</span>
          </a>
        </PopoverContent>
      </Popover>
    </Container>
  );
};

export default Profile;
