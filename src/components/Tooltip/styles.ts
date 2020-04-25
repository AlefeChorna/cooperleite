import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    width: 160px;
    background-color: #fd951f;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #100f12;
    opacity: 0;
    transition: opacity 400ms;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-45%);
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: #fd951f transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-45%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
