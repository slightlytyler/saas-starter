import cx from 'classnames';
import { capitalize } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Field as FormalField } from 'react-formal';

const Field = ({ className, floatingLabelText, name, ...props }) => (
  <FormalField
    {...props}
    className={cx('FormField', className)}
    floatingLabelText={floatingLabelText || capitalize(name)}
    name={name}
  />
);

Field.propTypes = {
  className: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Field.defaultProps = {
  className: undefined,
  floatingLabelText: undefined,
};

Field.componentName = 'Field';

export default Field;
