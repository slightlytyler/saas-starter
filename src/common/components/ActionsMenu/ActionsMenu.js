import { invoke, omit, reduce } from 'lodash/fp';
import { IconMenu } from 'material-ui';
import React from 'react';
import { mapProps } from 'recompose';
import Item from './ActionsMenuItem';
import MoreButton from '../MoreButton';

const renderItemsIteratee = (acc, item) => (
  item.disabled
    ? acc
    : [...acc, <Item {...item} key={item.id} />]
);

const renderItems = reduce(renderItemsIteratee, []);

const container = mapProps(props => ({
  ...omit('items', props),
  anchorOrigin: { horizontal: 'left', vertical: 'top' },
  children: renderItems(props.items),
  iconButtonElement: <MoreButton />,
  onTouchTap: invoke('stopPropagation'),
  targetOrigin: { horizontal: 'left', vertical: 'top' },
}));

export default container(IconMenu);
