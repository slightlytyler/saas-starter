import React, { PropTypes } from 'react';
import { TextField as MaterialTextField } from 'material-ui';

const TextField = props => (
  <MaterialTextField
    {...props}
    onChange={e => props.onChange && props.onChange(e.target.value)}
    value={props.value === null ? '' : props.value}
  />
);

TextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextField;
