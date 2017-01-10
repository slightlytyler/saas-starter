import classnames from 'classnames';
import { omit } from 'lodash/fp';
import { Checkbox } from 'material-ui';
import React, { PropTypes } from 'react';

const CustomCheckbox = props => (
  <Checkbox
    {...omit('value', props)}
    checked={props.value === null ? false : props.value}
    className={classnames('checkbox', props.className)}
    onCheck={e => props.onChange(e.target.checked)}
  />
);

CustomCheckbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

CustomCheckbox.defaultProps = {
  className: undefined,
};

export default CustomCheckbox;
