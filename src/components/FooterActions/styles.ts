import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 60px;
  position: absolute;
  bottom: 0;
  right: 0;
  border: none;
  background-color: #29292e;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  -webkit-box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.75);
`;
