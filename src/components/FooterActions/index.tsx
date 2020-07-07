import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { MdCancel, MdSave } from 'react-icons/md';

import history from '../../services/history';

import { Container } from './styles';

export interface FooterActionsProps {
  onCancelRoute?: string;
  onCancel?: () => void;
  onSubmit(): void;
}

const FooterActions: React.FC<FooterActionsProps> = ({
  onCancelRoute,
  onCancel,
  onSubmit,
}) => {
  const handleCancel = useCallback(() => {
    if (onCancelRoute) {
      history.replace(onCancelRoute, {});
    }
  }, [onCancelRoute]);

  return (
    <Container>
      <Button
        startIcon={<MdCancel />}
        variant="contained"
        style={{ backgroundColor: '#c35355', marginRight: 15, color: '#fff' }}
        onClick={onCancel ?? handleCancel}
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
        onClick={onSubmit}
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
