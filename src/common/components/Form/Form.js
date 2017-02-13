import cloneElement from 'common/react/cloneElement';
import mapChildren from 'common/react/mapChildren';
import { compose, get, identity, keys, memoize, pickBy } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Formal from 'react-formal';
import { Box } from 'react-layout-components';
import { withState } from 'recompose';

const getErrorForField = ({ element, errors }) => get([element.props.name, '0', 'message'], errors);

const applyFieldProps = ({ errors, events }) => element => cloneElement(
  {
    errorText: getErrorForField({ element, errors }),
    events,
  },
  element,
);

const getEvents = compose(keys, pickBy(identity));

const handleError = memoize(fn => errors => fn(errors));

const renderChildren = ({ children, errors, events }) => mapChildren(
  element => {
    if (element.type.componentName === 'Field') {
      if (element.props.events) return element;
      return applyFieldProps({ errors, events })(element);
    }

    return element;
  },
  children,
);

const Form = ({
  children,
  errors,
  setErrors,
  validateOnBlur,
  validateOnChange,
  ...props
}) => (
  <Formal {...props} onError={handleError(setErrors)}>
    <Box alignItems="flex-start" column justifyContent="flex-start">
      {renderChildren({
        children,
        errors,
        events: getEvents({
          onBlur: validateOnBlur,
          onChange: validateOnChange,
        }),
      })}
    </Box>
  </Formal>
);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
};

Form.defaultProps = {
  validateOnBlur: true,
  validateOnChange: false,
};

export default withState('errors', 'setErrors', {})(Form);
