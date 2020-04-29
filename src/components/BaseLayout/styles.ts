import styled from 'styled-components';

// const drawerMenuPadding = '40px';
// const drawerMenuClosePadding = '120px';

interface SectionProps {
  drawerMenuOpen: boolean;
  drawerMenuClosePadding: number;
  drawerMenuOpenPadding: number;
}

export const Section = styled.section<SectionProps>`
  flex-grow: 1;
  height: 100%;
  transition: padding-left
    ${(props): string => (props.drawerMenuOpen ? '0ms' : '200ms')} ease-in-out;
  padding-left: ${(props): number =>
    props.drawerMenuOpen
      ? props.drawerMenuOpenPadding
      : props.drawerMenuClosePadding}px;
  padding-top: 20px;
  background: red;
`;
