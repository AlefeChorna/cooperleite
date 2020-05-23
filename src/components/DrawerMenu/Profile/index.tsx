import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';

import { StoreStateTypes } from '../../../store/types';
import { profileRoute } from '../../../routes/config';
import { Container, Info } from './styles';

const Profile: React.FC = () => {
  const { profile } = useSelector((state: StoreStateTypes) => state.user);

  return (
    <Container>
      <Link to={profileRoute.path}>
        <Info>
          <strong>{profile.name}</strong>
          <p>{profile.role ?? 'Administrador'}</p>
        </Info>

        <Avatar src={profile.avatar_url} />
      </Link>
    </Container>
  );
};

export default Profile;
