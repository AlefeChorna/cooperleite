import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
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
