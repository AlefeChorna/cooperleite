import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/signin-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #29292e;
      border-radius: 10px;
      border: 2px solid #29292e;
      padding: 15px;
      width: 100%;
      color: #f4ede8;
      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
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
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 200ms;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    color: #fd951f;
    margin-top: 24px;
    text-decoration: none;
    transition: color 200ms;

    svg {
      margin-right: 15px;
    }

    &:hover {
      color: ${shade(0.2, '#fd951f')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
