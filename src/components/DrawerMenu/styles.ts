import styled from 'styled-components';

interface ContainerProps {
  name?: string;
  drawerOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: ${(props): string => (props.drawerOpen ? 'relative' : 'absolute')};
`;
