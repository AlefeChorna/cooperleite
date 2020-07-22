import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

export interface InputGroupProps extends GridProps {
  loading?: 'true' | 'false';
}

const InputGroup: React.FC<InputGroupProps> = ({ children, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      {children}
    </Grid>
  );
};

export default InputGroup;
