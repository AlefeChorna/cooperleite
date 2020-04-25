import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: #fd951f;
  color: #100f12;
  height: 54px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 16px;
  transition: background-color 200ms;

  &:hover {
    background-color: ${shade(0.2, '#fd951f')};
  }
`;
