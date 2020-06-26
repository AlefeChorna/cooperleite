import React from 'react';
import Buttom from '@material-ui/core/Button';

import InputSearch from '../InputSearch';

import { Container, Link } from './styles';

const NavMenu: React.FC = () => {
  return (
    <Container>
      <InputSearch
        onSubmit={() => {}}
        containerStyle={{ marginRight: 25 }}
        iconColor="#fd951f"
      />
      <Link to="/animals/edit">
        <Buttom
          style={{
            backgroundColor: '#fd951f',
            color: '#fff',
            padding: '7px 20px',
            marginRight: 15,
          }}
        >
          Editar
        </Buttom>
      </Link>
      <Link to="/animals/new">
        <Buttom
          style={{
            backgroundColor: '#4ab46e',
            color: '#fff',
            padding: '7px 20px',
          }}
        >
          Novo registro
        </Buttom>
      </Link>
    </Container>
  );
};

export default NavMenu;
