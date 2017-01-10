import React, { PropTypes } from 'react';
import { SelectField } from 'material-ui';

const CustomSelect = props => (
  <SelectField
    {...props}
    value={props.value === null ? '' : props.value}
    onChange={(e, i, value) => props.onChange && props.onChange(value)}
  />
);

CustomSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default CustomSelect;
