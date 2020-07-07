import styled from 'styled-components';
import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs';
import MUITypography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

export const Typography = styled(MUITypography)`
  color: #fd951f;
  font-size: 1rem;
  font-weight: 600 !important;
`;

export const Link = styled(MUILink)`
  color: #777 !important;
  font-size: 1rem;
  font-weight: 500 !important;
`;

export const Breadcrumbs = styled(MUIBreadcrumbs)`
  margin-left: 30px !important;

  ol {
    & .MuiBreadcrumbs-separator {
      color: #777;
    }
  }
`;
