import styled from 'styled-components';
import { TableHeaderRow as MUTableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import MUTableHead from '@material-ui/core/TableHead';

interface ContainerProps {
  drawerMenuOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: block;
  width: calc(100% - 0px);
  transition: width 400ms ease-in-out;
`;

export const TableHeaderRow = styled(MUTableHeaderRow).attrs({
  style: { height: 500 },
})``;

export const TableHead = styled(MUTableHead)`
  tr {
    th {
      color: #fff;
      font-weight: bold;
      border-bottom: 1px solid red;
    }

    :last-child {
      border: none;
    }
  }
`;
