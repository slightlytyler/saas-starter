import classnames from 'classnames';
import getUnhandledProps from 'common/data/getUnhandledProps';
import cloneElement from 'common/react/cloneElement';
import mapChildren from 'common/react/mapChildren';
import { keys, reduce } from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
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

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
};

const defaultProps = {
  className: undefined,
  validateOnBlur: undefined,
  validateOnChange: undefined,
};

export default class Form extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  getEvents = () => {
    const { validateOnBlur, validateOnChange } = this.props;

    if (validateOnBlur || validateOnChange) {
      return reduce(
        (acc, el) => (el.enabled ? [...acc, el.name] : acc),
        [],
        [
          { name: 'onBlur', enabled: validateOnBlur },
          { name: 'onChange', enabled: validateOnChange },
        ],
      );
    }

    return this.defaultEvents;
  };

  appyleEvents = element => cloneElement({ events: this.getEvents() }, element);

  defaultEvents = ['onBlur'];

  handledProps = keys(propTypes);

  renderChildren = mapChildren(element => {
    if (element.type === Field) {
      if (element.props.events) return element;
      return this.appyleEvents(element);
    }

    return element;
  });

  render = () => (
    <Formal
      {...getUnhandledProps(this.handledProps, this.props)}
      className={classnames('vbc__form', this.props.className)}
    >
      {this.renderChildren(this.props.children)}
    </Formal>
  );
}
