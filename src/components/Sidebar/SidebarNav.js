import withLocation from 'containers/withLocation';
import { capitalize, compose, get, head, map, split, trimChars } from 'lodash/fp';
import { List, ListItem, makeSelectable } from 'material-ui';
import React, { PropTypes } from 'react';
import MaterialIcon from '../MaterialIcon';

const SelectableList = makeSelectable(List);

const getValueFromLocation = compose(head, split('/'), trimChars('/'), get('pathname'));

// eslint-disable-next-line react/prop-types
const renderItemsIteratee = ({ icon, label, onTouchTap, value }) => (
  <ListItem
    key={value}
    leftIcon={<MaterialIcon>{icon}</MaterialIcon>}
    onTouchTap={onTouchTap}
    primaryText={label || capitalize(value)}
    value={value}
  />
);

const renderItems = map(renderItemsIteratee);

const SidebarNav = ({ items, location }) => (
  <SelectableList style={{ width: '100%' }} value={getValueFromLocation(location)}>
    {renderItems(items)}
  </SelectableList>
);

SidebarNav.propTypes = {
  items: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default withLocation(SidebarNav);
