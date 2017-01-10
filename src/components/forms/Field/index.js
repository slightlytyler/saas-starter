import React, { Component, PropTypes } from 'react';
import { Field } from 'react-formal';
import classnames from 'classnames';
import { omit } from 'lodash/fp';

export default class FormField extends Component {
  static propTypes = {
    error: PropTypes.array,
    width: PropTypes.number,
  };

  static defaultProps = {
    error: undefined,
    width: 1,
  };

  handledProps = ['error'];

  widthStyles = () => {
    if (this.props.width) return { flex: this.props.width };
    return {};
  };

  render() {
    const classes = classnames('mui--form__field', { error: this.props.error });
    const passProps = omit(this.handledProps, this.props);
    const errorText = this.props.error && this.props.error.length
      ? this.props.error[0].message
      : undefined;

    return (
      <div className={classes} style={this.widthStyles()}>
        <Field {...passProps} errorText={errorText} />
      </div>
    );
  }
}
