import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconVisibility from '@material-ui/icons/Visibility';
import IconEdit from '@material-ui/icons/Edit';
import IconDelete from '@material-ui/icons/Delete';

import { IconButton } from './styles';

interface ActionsProps {
  actions: ['show', 'edit', 'delete'];
  paths: {
    show: string;
    edit: string;
  };
  onDelete(): void;
}

const Actions: React.FC<ActionsProps> = ({ actions, paths, onDelete }) => {
  return (
    <>
      {actions.includes('show') && (
        <Link to={paths.show}>
          <Tooltip title="Visualizar">
            <IconButton>
              <IconVisibility htmlColor="#27ce7a" />
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {actions.includes('edit') && (
        <Link to={paths.edit}>
          <Tooltip title="Editar">
            <IconButton>
              <IconEdit htmlColor="#fd951f" />
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {actions.includes('delete') && (
        <Tooltip title="Excluir">
          <IconButton onClick={onDelete}>
            <IconDelete htmlColor="#c95355" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default memo(Actions);
