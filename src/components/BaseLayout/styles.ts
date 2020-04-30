import styled from 'styled-components';

interface SectionProps {
  drawerMenuOpen: boolean;
  drawerMenuClosePadding: number;
  drawerMenuOpenPadding: number;
}

export const Section = styled.section<SectionProps>`
  flex-grow: 1;
  height: 100vh;
  padding: 0;
  transition: padding-left
    ${(props): string => (props.drawerMenuOpen ? '0ms' : '225ms')} ease-in-out;
  padding-left: ${(props): number =>
    props.drawerMenuOpen
      ? props.drawerMenuOpenPadding
      : props.drawerMenuClosePadding}px;
`;
