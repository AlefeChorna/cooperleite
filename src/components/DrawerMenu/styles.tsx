import React from 'react';
import styled from 'styled-components';
import MUIDrawer, {
  DrawerProps as MUIDrawerProps,
} from '@material-ui/core/Drawer';
import MUIAppBar from '@material-ui/core/AppBar';

interface ContainerProps {
  name?: string;
  drawerOpen: boolean;
}

interface DrawerProps extends MUIDrawerProps {
  drawerOpen: boolean;
  drawerWidthOpen: number;
  drawerWidthClose: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: ${(props): string => (props.drawerOpen ? 'relative' : 'absolute')};
`;

export const Root = styled.div`
  display: flex;
`;

export const EmptyListItem = styled.div`
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: flex-end;
`;

export const Drawer = styled(
  ({
    drawerOpen,
    drawerWidthOpen,
    drawerWidthClose,
    ...props
  }: DrawerProps) => <MUIDrawer {...props} />,
)`
  width: ${(props): number =>
    props.drawerOpen ? props.drawerWidthOpen : props.drawerWidthClose}px;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  flex-shrink: 0;
  white-space: nowrap;

  > div {
    width: ${(props): number =>
      props.drawerOpen ? props.drawerWidthOpen : props.drawerWidthClose}px;
    background-color: #29292e;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    overflow-x: hidden;
    border-right: none;
  }
`;

export const AppBar = styled(MUIAppBar)`
  z-index: 1500 !important;

  @media (max-width: 600px) {
    min-height: 64px;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 24px;
  }
`;
