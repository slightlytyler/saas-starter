import classnames from 'classnames';
import cloneElement from 'common/react/cloneElement';
import mapChildren from 'common/react/mapChildren';
import { compose, identity, keys, pickBy } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Formal from 'react-formal';
import CheckboxField from '../CheckboxField';
import Field from '../Field';
import NumberField from '../NumberField';
import PasswordField from '../PasswordField';
import TextField from '../TextField';

Formal.addInputTypes({
  boolean: CheckboxField,
  checkbox: CheckboxField,
  number: NumberField,
  password: PasswordField,
  string: TextField,
  text: TextField,
});

const appyleEvents = ({ element, events }) => cloneElement({ events }, element);

const getEvents = compose(keys, pickBy(identity));

const renderChildren = ({ children, events }) => mapChildren(
  element => {
    if (element.type === Field) {
      if (element.props.events) return element;
      return appyleEvents(events)(element);
    }

    return element;
  },
  children,
);

const Form = ({ children, className, validateOnBlur, validateOnChange, ...props }) => (
  <Formal {...props} className={classnames('Form', className)}>
    {renderChildren({
      children,
      events: getEvents({
        onBlur: validateOnBlur,
        onChange: validateOnChange,
      }),
    })}
  </Formal>
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
