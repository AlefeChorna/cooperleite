import styled from 'styled-components';
import Color from 'color';

export const Container = styled.div`
  display: flex;
  width: 280px;
  height: 38px;
  align-items: center;
  background-color: #29292e;
  border-radius: 5px;
  transition: width 250ms ease-in-out;
  border: ${Color('#fd951f').alpha(0.5).toString()} solid 1px;
`;

export const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Pesquisar...',
})`
  width: 81%;
  height: 70%;
  padding: 0 10px 0 15px;
  border: none;
  background: transparent;
  outline-style: none;
  font-size: 1rem;
  color: #fd951f;

  ::-webkit-input-placeholder {
    /* Edge */
    color: #fd951f;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fd951f;
  }

  ::placeholder {
    /* Chrome and Firefox */
    color: #fd951f;
  }
`;
