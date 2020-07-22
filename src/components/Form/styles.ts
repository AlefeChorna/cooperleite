import styled, { keyframes, css } from 'styled-components';

import InputGroupComponent from '../InputGroup';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(90px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animation = css`
  animation: ${appearFromLeft} 900ms;
`;

export const InputGroup = styled(InputGroupComponent)`
  opacity: ${(props): number => (props?.loading === 'true' ? 0 : 1)};
  ${(props): any => props?.loading === 'false' && animation};
`;
