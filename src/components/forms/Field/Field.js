import getUnhandledProps from 'common/data/getUnhandledProps';
import { keys, size } from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
import { Field as FormalField } from 'react-formal';

const propTypes = {
  events: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  name: PropTypes.string.isRequired,
};

export default class Field extends Component {
  static propTypes = propTypes;

  static defaultProps = {
    events: undefined,
  };

  static contextTypes = {
    messageContainer: React.PropTypes.object,
  };

  state = {};

  componentWillMount = () => {
    this.unsubscribe = this.context.messageContainer.subscribe(messages => (
      this.setState({ messages: messages[this.props.name] })
    ));
  };

  componentWillUnmount = () => this.unsubscribe();

  getEvents = () => (size(this.state.messages) ? 'onChange' : this.props.events);

  render = () => (
    <FormalField
      {...getUnhandledProps(keys(propTypes), this.props)}
      errorClass="error"
      // events={this.getEvents()}
      events="onBlur"
      name={this.props.name}
    />
  );
}
