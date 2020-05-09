import styled from 'styled-components';

interface ContainerProps {
  drawerMenuOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: block;
  width: calc(100% - 0px);
  transition: width 400ms ease-in-out;
`;
