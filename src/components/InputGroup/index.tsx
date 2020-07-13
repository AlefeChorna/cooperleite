import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

const InputGroup: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      {children}
    </Grid>
  );
};

export default InputGroup;
