import styled from 'styled-components';
import { Table, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import MUITableHead from '@material-ui/core/TableHead';

interface ContainerProps {
  drawerMenuOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: block;
  width: calc(100% - 0px);
  transition: width 400ms ease-in-out;
`;

export const TableHead = styled(MUITableHead)`
  tr {
    th {
      color: #fff;
      font-weight: bold;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      background-color: #29292e;

      span {
        &:hover {
          color: #fd951f;
        }

        &:focus {
          color: #fd951f;
        }
      }

      :last-child {
        border: none;
        border-left: 1px solid #777;
        border-bottom: 1px solid #777;
      }
    }

    :last-child {
      display: block;
    }
  }
`;

export const TableCell = styled(Table.Cell)`
  background-color: #29292e !important;
  color: #fff !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;

  :last-child {
    border-left: 1px solid #444;
    border-bottom: 1px solid #444 !important;
  }
`;

export const PagingPanelContainer = styled(PagingPanel.Container)`
  background-color: #29292e;
  color: #fff;

  div {
    color: #fff;

    svg {
      color: #fff;
    }

    button {
      span {
        color: #fff !important;
      }
    }

    & .Mui-disabled {
      span {
        svg {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }

    & .Pagination-activeButton-275 {
      span {
        color: #fa751f !important;
        font-size: 15px;
      }
    }
  }
`;
