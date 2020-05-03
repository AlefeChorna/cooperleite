import React from 'react';
import styled from 'styled-components';
import MDListItem from '@material-ui/core/ListItem';

export const ListItem = styled(({ ...otherProps }: any) => (
  <MDListItem {...otherProps} button style={{ paddingLeft: 25 }} />
))`
  &:hover {
    background-color: #5a4799;
  }

  &.Mui-selected {
    background-color: #5a4799;
  }

  &.MuiListItem-root:hover {
    background-color: #5a4799;
  }
`;
