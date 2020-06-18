import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: #100F12;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Fira Sans Condensed', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  ::selection {
    color: #fff;
    background-color: #fd951f;
  }

  /* for firefox */
  ::moz-selection {
    color: #fff;
    background-color: #fd951f;
  }
`;
