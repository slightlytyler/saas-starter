import cx from 'classnames';
import injectStyles from 'common/containers/injectStyles';
import { capitalize, isUndefined } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Field as FormalField } from 'react-formal';

const FormField = ({ classes, className, floatingLabelText, name, ...props }) => (
  <FormalField
    {...props}
    className={cx(className, classes.root)}
    floatingLabelText={isUndefined(floatingLabelText) ? capitalize(name) : floatingLabelText}
    name={name}
  />
);

FormField.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  floatingLabelText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FormField.defaultProps = {
  className: undefined,
  floatingLabelText: undefined,
};

FormField.componentName = 'Field';

const styles = {
  root: {
    'min-width': '25em',
  },
};

const container = injectStyles(styles);

export default container(FormField);
