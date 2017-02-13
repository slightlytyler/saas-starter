import React, { PropTypes } from 'react';
import * as colors from 'styles/colors';
import MaterialIcon from '../MaterialIcon';

const selectColor = value => (value ? colors.green50 : colors.red50);

const selectIcon = value => (value ? 'done' : 'clear');

const Bool = ({ value }) => (
  <MaterialIcon color={selectColor(value)}>
    {selectIcon(value)}
  </MaterialIcon>
);

Bool.propTypes = {
  value: PropTypes.bool,
};

Bool.defaultProps = {
  value: false,
};

export default Bool;
