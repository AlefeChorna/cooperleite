import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0px 25px 35px;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;
