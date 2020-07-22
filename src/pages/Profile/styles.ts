import styled from 'styled-components';
import { shade } from 'polished';

import FormComponent from '../../components/Form';
import Col from '../../components/Col';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .profile {
    padding: 30px 0px;
    margin-bottom: 30px;
  }

  @media (min-width: 600px) {
    .profile {
      flex-grow: 0;
      max-width: 100%;
      flex-basis: 100%;
    }
  }
  @media (min-width: 960px) {
    flex-direction: row;

    .profile {
      flex-grow: 0;
      max-width: 40%;
      flex-basis: 40%;
    }

    .form {
      flex-grow: 0;
      max-width: calc(60% - 40px);
      flex-basis: calc(60% - 40px);
    }
  }
`;

export const Form = styled(FormComponent)`
  display: flex;
  flex-direction: column;
  padding: 25px 0;

  & .MuiGrid-spacing-xs-2 > .MuiGrid-item {
    padding: 0 0 9px 0;
  }

  & .MuiGrid-spacing-xs-2 {
    padding: 15px 30px;
  }
`;

export const AvatarContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #29292e;
  border-radius: 5px;
  padding: 5px;
  height: 300px;

  strong {
    margin-bottom: 6px;
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

export const InputContainer = styled(Col)`
  background-color: #29292e;
  border-radius: 5px;

  h3 {
    padding: 30px 0 0 30px;
  }
`;
