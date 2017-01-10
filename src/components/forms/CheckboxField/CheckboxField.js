import getEventChecked from 'common/events/getEventChecked';
import { compose, identity, isNull, memoize, omit } from 'lodash/fp';
import { Checkbox } from 'material-ui';
import React, { PropTypes } from 'react';

const handleChange = memoize(fn => compose(fn, getEventChecked));

const CheckboxField = ({ onChange, value, ...props }) => (
  <Checkbox
    {...omit('meta', props)}
    checked={isNull(value) ? false : value}
    onCheck={handleChange(onChange)}
  />
);

CheckboxField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CheckboxField.defaultProps = {
  onChange: identity,
  value: null,
};

export default CheckboxField;
