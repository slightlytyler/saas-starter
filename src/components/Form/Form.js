import cx from 'classnames';
import cloneElement from 'common/react/cloneElement';
import mapChildren from 'common/react/mapChildren';
import StateProvider from 'components/StateProvider';
import { compose, get, identity, keys, memoize, pickBy } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Formal from 'react-formal';

const getErrorForField = ({ element, errors }) => get([element.props.name, '0', 'message'], errors);

const applyFieldProps = ({ errors, events }) => element => cloneElement(
  {
    errorText: getErrorForField({ element, errors }),
    events,
  },
  element,
);

const getEvents = compose(keys, pickBy(identity));

const handleError = memoize(fn => errors => fn({ errors }));

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

const Form = ({ children, className, validateOnBlur, validateOnChange, ...props }) => (
  <StateProvider initialState={{ errors: {} }}>
    {({ setState, state }) => (
      <Formal
        {...props}
        className={cx('Form', className)}
        onError={handleError(setState)}
      >
        {renderChildren({
          children,
          errors: state.errors,
          events: getEvents({
            onBlur: validateOnBlur,
            onChange: validateOnChange,
          }),
        })}
      </Formal>
    )}
  </StateProvider>
);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
};

Form.defaultProps = {
  className: undefined,
  validateOnBlur: true,
  validateOnChange: false,
};

export default Form;
