import styled from 'styled-components';
import MUIDrawer from '@material-ui/core/Drawer';
import MUIAppBar from '@material-ui/core/AppBar';

interface ContainerProps {
  name?: string;
  drawerOpen: boolean;
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

export const Drawer = styled(MUIDrawer)`
  width: 250px;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const AppBar = styled(MUIAppBar).attrs({
  style: {},
})`
  z-index: 1500 !important;

  @media (max-width: 600px) {
    min-height: 64px;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 24px;
  }
`;
