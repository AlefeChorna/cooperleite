import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  min-width: 190px;

  a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 15px 0 10px;
  flex-direction: column;

  strong {
    color: #ffffff;
    font-size: 1rem;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: end;
  }

  p {
    color: #ffffff;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 600;
  }
`;

export const PopoverContent = styled.div`
  width: 200px;
  padding: 10px 0px;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: #100f10;
    cursor: pointer;

    padding: 10px 20px;

    svg {
      color: #fd951f;
    }

    span {
      padding-left: 10px;
      font-size: 1rem;
    }

    &:hover {
      background-color: #ddd;
    }
  }

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: #fd951f transparent;
    border-width: 7px 7px 0px 7px;
    top: 0%;
    left: 50%;
    transform: translateX(-45%);
  }
`;
