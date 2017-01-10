import React, { Component, PropTypes } from 'react';

export default class FieldSet extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    errors: PropTypes.object,
    events: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    className: undefined,
    errors: undefined,
    events: undefined,
  };

  getErrorForName = name => this.props.errors[name];

  renderChildren = () => React.Children.map(this.props.children, child => (
    React.cloneElement(child, {
      className: this.props.className,
      error: this.getErrorForName(child.props.name),
      events: this.props.events,
    })
  ));

  render() {
    return (
      <div className="mui--form__field-set">
        {this.renderChildren()}
      </div>
    );
  }
}
