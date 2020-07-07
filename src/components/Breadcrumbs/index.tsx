import React, { useCallback } from 'react';

import history from '../../services/history';
import {
  useBreadcrumbs,
  BreadcrumbProps,
  HTMLAnchorElementEvent,
} from '../../hooks/BreadcrumbsContext';

import { Breadcrumbs, Typography, Link } from './styles';

const BreadcrumbsComponent: React.FC = () => {
  const { breadcrumbs } = useBreadcrumbs();

  const handleClick = useCallback(
    (event: HTMLAnchorElementEvent, breadcrumb: BreadcrumbProps) => {
      if (breadcrumb.onClick) {
        breadcrumb.onClick(event, breadcrumb);
      } else {
        event.preventDefault();
        history.push(breadcrumb.path || '');
      }
    },
    [],
  );

  if (!breadcrumbs?.length) return <></>;

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="/">
      {breadcrumbs.map((breadcrumb, idx) => {
        const isLastBreadcrumb = idx === breadcrumbs.length - 1;
        const key = `${idx}-${breadcrumb.text}`;

        if (isLastBreadcrumb) {
          return <Typography key={key}>{breadcrumb.text}</Typography>;
        }

        return (
          <Link
            key={key}
            href={breadcrumb.path}
            onClick={(event: HTMLAnchorElementEvent): void => {
              handleClick(event, breadcrumb);
            }}
          >
            {breadcrumb.text}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
