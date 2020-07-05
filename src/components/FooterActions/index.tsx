import React from 'react';
import Button from '@material-ui/core/Button';
import { MdCancel, MdSave } from 'react-icons/md';

import { Container } from './styles';

const FooterActions: React.FC = () => {
  return (
    <Container>
      <Button
        startIcon={<MdCancel />}
        variant="contained"
        style={{ backgroundColor: '#c35355', marginRight: 15, color: '#fff' }}
      >
        <span
          style={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem' }}
        >
          Cancelar
        </span>
      </Button>
      <Button
        startIcon={<MdSave style={{ fontSize: 18 }} />}
        variant="contained"
        style={{ backgroundColor: '#4ab46e', color: '#fff' }}
      >
        <span
          style={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem' }}
        >
          Salvar
        </span>
      </Button>
    </Container>
  );
};

export default FooterActions;
