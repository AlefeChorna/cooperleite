import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  min-width: 400px;

  form {
    display: flex;
    flex-direction: column;
    margin: 40px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 30px;
  align-self: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: #fd951f;
    border: none;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    cursor: pointer;

    transition: background-color 200ms;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #100f12;
    }

    &:hover {
      background-color: ${shade(0.2, '#fd951f')};
    }
  }
`;
