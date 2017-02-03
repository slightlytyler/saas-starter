import { map } from 'lodash/fp';
import { List } from 'material-ui';
import React, { PropTypes } from 'react';
import Item from './OperationsListItem';

const OperationsList = ({ ids }) => (
  <List>
    {map(id => <Item id={id} />, ids)}
  </List>
);

OperationsList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OperationsList;
