import React, { useMemo, forwardRef, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiCheck, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { Link, LinkProps } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItem } from './styles';

interface ListItemLinkProps {
  key?: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  selected: boolean;
  to?: string;
  isCollapsible?: boolean;
  isCollapsibleItem?: boolean;
  collapseIsOpen?: boolean;
  onClick?: (name: string) => void;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({
  icon: ItemIcon,
  name,
  selected,
  isCollapsible,
  isCollapsibleItem,
  to = '',
  collapseIsOpen,
  onClick,
}) => {
  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, LinkProps>((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  const itemClick = useCallback(() => {
    onClick && onClick(name);
  }, [name, onClick]);

  const colapseProps = useMemo(
    () => (isCollapsible ? {} : { component: renderLink }),
    [isCollapsible, renderLink],
  );

  const itemSelected = selected && !isCollapsibleItem;
  const styleBackground = {
    backgroundColor: itemSelected ? '#5a4799' : '#29292e',
  };

  return (
    <li style={styleBackground}>
      <ListItem selected={itemSelected} onClick={itemClick} {...colapseProps}>
        <ListItemIcon
          style={{
            justifyContent: isCollapsibleItem ? 'center' : 'flex-start',
          }}
        >
          {!!ItemIcon && <ItemIcon size={20} color="#FFF" />}
          {selected && isCollapsibleItem && <FiCheck size={17} color="#FFF" />}
        </ListItemIcon>
        <ListItemText
          style={{
            color: '#FFF',
          }}
          primary={name}
        />

        {isCollapsible &&
          (collapseIsOpen ? (
            <FiChevronDown color="#FFF" />
          ) : (
            <FiChevronRight color="#FFF" />
          ))}
      </ListItem>
    </li>
  );
};

export default ListItemLink;
