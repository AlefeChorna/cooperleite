import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

const Col: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid item {...props}>
      {children}
    </Grid>
  );
};

export default Col;
