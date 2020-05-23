import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: ${(props): string =>
    props.disabled ? shade(0.6, '#fd951f') : '#fd951f'};
  color: #100f12;
  height: 45px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 16px;
  transition: background-color 200ms;

  ${(props): any =>
    !props.disabled &&
    css`
      &:hover {
        background-color: ${shade(0.2, '#fd951f')};
      }
    `}
`;
