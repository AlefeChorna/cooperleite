import styled from 'styled-components';
import { Table, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import MUITableHead from '@material-ui/core/TableHead';
import MUIPaper from '@material-ui/core/Paper';

interface ContainerProps {
  drawerMenuOpen: boolean;
  drawerMenuWidthOpen: number;
  drawerMenuWidthClose: number;
}

function calcContainerWidth(metrics: ContainerProps): string {
  const defaultPaddingOnPages = 35;
  const padding = defaultPaddingOnPages * 2;
  const drawerWidth = metrics.drawerMenuOpen
    ? metrics.drawerMenuWidthOpen + padding
    : metrics.drawerMenuWidthClose + padding;

  return `calc(100vw - ${drawerWidth}px)`;
}

export const Container = styled.div<ContainerProps>`
  display: block;
  width: ${(props): string => calcContainerWidth(props)};
  transition: width 400ms ease-in-out;

  scrollbar-width: thin;

  *::-webkit-scrollbar {
    width: 1.4em;
    height: 7px;
    background: #777;
  }
  *::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #5a4799 10%, #fd951f 30%, #5a4799 99%);
    outline: 1px solid black;
    border-radius: 6px;
  }
`;

export const Paper = styled(MUIPaper)`
  position: relative;
  background-color: #100f12 !important;
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

      :first-child {
        border-top-left-radius: 3px;
      }

      :last-child {
        border: none;
        border-left: 1px solid #777;
        border-bottom: 1px solid #777;
        border-top-right-radius: 3px;
      }

      ::after {
        background-color: #5a4799;
        opacity: 0.2;
        border: #fff solid 1px;
        border-bottom: none;
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
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

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

    & [class^='Pagination-activeButton'],
    [class*=' Pagination-activeButton'] {
      span {
        color: #fa751f !important;
      }
    }
  }
`;
