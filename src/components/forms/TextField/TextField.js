import getEventValue from 'common/events/getEventValue';
import { compose, identity, isNull, memoize, omit } from 'lodash/fp';
import { TextField as MaterialTextField } from 'material-ui';
import React, { PropTypes } from 'react';

const handleChange = memoize(fn => compose(fn, getEventValue));

const TextField = ({ onChange, value, ...props }) => (
  <MaterialTextField
    {...omit('meta', props)}
    onChange={handleChange(onChange)}
    value={isNull(value) ? '' : value}
  />
);

TextField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

TextField.defaultProps = {
  onChange: identity,
  value: null,
};

export default TextField;
