import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import FormComponent from '../../components/Form';

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
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
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

export const Form = styled(FormComponent)`
  & .MuiGrid-spacing-xs-2 > .MuiGrid-item {
    padding: 0 0 9px 0;
  }

  div {
    justify-content: center;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
