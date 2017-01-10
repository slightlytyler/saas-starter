import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Divider, RaisedButton, Subheader } from 'material-ui';
import { Box, VerticalBox } from 'components/layout';
import { injectIntl, intlShape } from 'modules/intl/helpers';

export class FileField extends Component {
  static propTypes = {
    errorText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    intl: intlShape.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.object,
  };

  getValueFilename = () => (this.props.value && this.props.value.name);

  renderErrors = () => {
    if (!this.props.errorText) return null;

    return (
      <Box className="errors">{this.props.errorText}</Box>
    );
  };

  renderLabel = () => {
    if (!this.props.floatingLabelText) return null;

    return (
      <div className="label">
        <Subheader>{this.props.floatingLabelText}</Subheader>
        <Divider />
      </div>
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <VerticalBox className={classnames('field--file', { error: !!this.props.errorText })}>
        {this.renderLabel()}
        <Box alignItems="center" justifyContent="flex-start">
          <RaisedButton
            className="button"
            containerElement="label"
            label={formatMessage({
              id: 'annotation.chooseAFile',
              description: 'choose a file annotation',
              defaultMessage: 'Choose a file',
            })}
            labelPosition="before"
            secondary
          >
            <input
              className="input"
              onChange={e => this.props.onChange(e.target.files[0])}
              type="file"
            />
          </RaisedButton>
          <div className="filename">
            {this.getValueFilename() || formatMessage({
              id: 'annotation.noFileSelected',
              description: 'no file selected annotation',
              defaultMessage: 'No file selected',
            })}
          </div>
        </Box>
        {this.renderErrors()}
      </VerticalBox>
    );
  }
}

export default injectIntl(FileField);
