import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #29292e;
  border-radius: 10px;
  border: 2px solid #29292e;
  padding: 12px 15px;;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c35355;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #fd951f;
      color: #fd951f;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #fd951f;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
    margin-left: 16px;
  }

  span {
    background-color: #c35355;
    color: #fff;

    &::before {
      border-color: #c35355 transparent;
    }
  }
`;
