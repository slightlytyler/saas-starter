import React, { Component, PropTypes } from 'react';
import { updateIn, merge } from 'react-update-in';
import { capitalize, compose, keys, map, mapKeys, mapValues, omit, zipObject } from 'lodash/fp';
import generateId from 'shortid';
import { Divider, IconButton, FloatingActionButton, FontIcon, Subheader } from 'material-ui';
import colors from 'colors';
import { Checkbox, MenuItem, Select, TextField } from 'components/forms';
import { Box, VerticalBox } from 'components/layout';
import { injectIntl, intlShape } from 'modules/intl/helpers';

export class Properties extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      encrypt: PropTypes.bool,
      format: PropTypes.bool,
      messageKey: PropTypes.bool,
      pattern: PropTypes.bool,
      required: PropTypes.bool,
    }),
    floatingLabelText: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.object,
  };

  static defaultProps = {
    fields: {},
    value: {},
  };

  state = {
    properties: {},
  };

  componentWillMount() {
    const propertiesWithKeysAsProps = zipObject(
      keys(this.props.value),
      map(
        key => ({
          ...this.props.value[key],
          key,
          id: generateId(),
        }),
        keys(this.props.value)
      )
    );
    const propertiesWithIds = mapKeys(
      key => propertiesWithKeysAsProps[key].id,
      propertiesWithKeysAsProps
    );

    this.setState({ properties: propertiesWithIds });
  }

  getValue = () => {
    const withCorrectKeys = mapKeys(key => this.state.properties[key].key, this.state.properties);
    const withOmittedValues = mapValues(omit(['id', 'key']), withCorrectKeys);
    const withOmittedPatterns = mapValues(
      val => (
        val.type === 'string'
          ? val
          : omit('pattern', val)
      ),
      withOmittedValues
    );

    return withOmittedPatterns;
  };

  getProps = () => {
    const props = {
      key: '',
      type: '',
    };

    if (this.props.fields.encrypt) {
      props.encrypt = false;
    }

    if (this.props.fields.format) {
      props.format = '';
    }

    if (this.props.fields.messageKey) {
      props.messageKey = false;
    }

    if (this.props.fields.pattern) {
      props.pattern = '';
    }

    if (this.props.fields.required) {
      props.required = false;
      props.oneOf = false;
    }

    return props;
  };

  handleAddElement = () => {
    const id = generateId();
    this.setState({
      properties: Object.assign({}, this.state.properties, {
        [id]: {
          id,
          ...this.getProps(),
        },
      }),
    });
  };

  handleChange = (id, key, value) => this.updateElementProp(id, key, value, this.afterChange);

  handleDeleteElement = id => this.setState({
    properties: omit(id, this.state.properties),
  }, this.afterChange);

  afterChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  };

  updateElementProp = (id, key, value, cb) => this.setState(
    {
      properties: updateIn(this.state.properties, [id], merge, {
        [key]: value,
      }),
    },
    cb
  );

  renderDeleteButton = el => (
    <IconButton
      onTouchTap={() => this.handleDeleteElement(el.id)}
      style={{ flex: 0 }}
      touch
    >
      <FontIcon
        className="material-icons"
        color={colors.red50}
      >
        close
      </FontIcon>
    </IconButton>
  );

  renderEncryptField = el => {
    const { formatMessage } = this.props.intl;

    if (!this.props.fields.encrypt) return null;
    return (
      <Checkbox
        label={compose(capitalize, formatMessage)({
          id: 'encrypt',
          description: 'the word encrypt',
          defaultMessage: 'Encrypt',
        })}
        onChange={val => this.handleChange(el.id, 'encrypt', val)}
        style={{ display: 'block', width: 'auto' }}
        value={el.encrypt}
      />
    );
  };

  renderFormatField = el => {
    const { formatMessage } = this.props.intl;

    if (!this.props.fields.format) return null;
    return (
      <TextField
        floatingLabelText={compose(capitalize, formatMessage)({
          id: 'format',
          description: 'the word format',
          defaultMessage: 'Format',
        })}
        onChange={val => this.handleChange(el.id, 'format', val)}
        style={{ width: 'auto' }}
        value={el.format}
      />
    );
  };

  renderMessageKeyField = el => {
    const { formatMessage } = this.props.intl;

    if (!this.props.fields.messageKey) return null;
    return (
      <Checkbox
        label={compose(capitalize, formatMessage)({
          id: 'annotation.messageKey',
          description: 'message key annotation',
          defaultMessage: 'Message Key',
        })}
        onChange={val => this.handleChange(el.id, 'messageKey', val)}
        style={{ display: 'block', width: 'auto' }}
        value={el.messageKey}
      />
    );
  };

  renderPatternField = el => {
    const { formatMessage } = this.props.intl;

    if (!this.props.fields.pattern) return null;
    return (
      <TextField
        disabled={el.type !== 'string'}
        floatingLabelText={compose(capitalize, formatMessage)({
          id: 'pattern',
          description: 'the word pattern',
          defaultMessage: 'Pattern',
        })}
        onChange={val => this.handleChange(el.id, 'pattern', val)}
        style={{ width: 'auto' }}
        value={el.type !== 'string' ? '' : el.pattern}
      />
    );
  };

  renderRequiredFields = el => {
    const { formatMessage } = this.props.intl;

    if (!this.props.fields.required) return null;
    return [
      <Checkbox
        key={`${el.id}-required`}
        label={compose(capitalize, formatMessage)({
          id: 'required',
          description: 'the word required',
          defaultMessage: 'Required',
        })}
        onChange={val => this.handleChange(el.id, 'required', val)}
        style={{ display: 'block', width: 'auto' }}
        value={el.required}
      />,
      <Checkbox
        key={`${el.id}-oneOf`}
        label={compose(capitalize, formatMessage)({
          id: 'annotation.oneOf',
          description: 'one of annotation',
          defaultMessage: 'One Of',
        })}
        onChange={val => this.handleChange(el.id, 'oneOf', val)}
        style={{ display: 'block', width: 'auto' }}
        value={el.oneOf}
      />,
    ];
  };

  renderElements = () => {
    const { formatMessage } = this.props.intl;

    if (!Object.keys(this.state.properties).length) return this.renderEmptyState();
    return map(
      el => (
        <Box
          alignItems="center"
          className="element"
          justifyContent="space-between"
          key={el.id}
          style={{ width: '100%' }}
          width="100%"
        >
          <TextField
            floatingLabelText={compose(capitalize, formatMessage)({
              id: 'key',
              description: 'the word key',
              defaultMessage: 'Key',
            })}
            onChange={val => this.handleChange(el.id, 'key', val)}
            value={el.key}
          />
          <Select
            floatingLabelText={compose(capitalize, formatMessage)({
              id: 'type',
              description: 'the word type',
              defaultMessage: 'Type',
            })}
            onChange={val => this.handleChange(el.id, 'type', val)}
            value={el.type}
          >
            <MenuItem
              key={0}
              value="string"
              primaryText={compose(capitalize, formatMessage)({
                id: 'string',
                description: 'the word string',
                defaultMessage: 'String',
              })}
            />
            <MenuItem
              key={1}
              value="number"
              primaryText={compose(capitalize, formatMessage)({
                id: 'number',
                description: 'the word number',
                defaultMessage: 'Number',
              })}
            />
            <MenuItem
              key={2}
              value="bool"
              primaryText={compose(capitalize, formatMessage)({
                id: 'boolean',
                description: 'the word boolean',
                defaultMessage: 'Boolean',
              })}
            />
          </Select>
          {this.renderFormatField(el)}
          {this.renderPatternField(el)}
          {this.renderRequiredFields(el)}
          {this.renderMessageKeyField(el)}
          {this.renderEncryptField(el)}
          {this.renderDeleteButton(el)}
        </Box>
      ),
      this.state.properties
    );
  };

  renderEmptyState = () => {
    const { formatMessage } = this.props.intl;

    return (
      <Box
        center
        className="empty-state"
      >
        {formatMessage({
          id: 'annotation.noPropertiesFound',
          description: 'no properties found annotation',
          defaultMessage: 'No properties found',
        })}
      </Box>
    );
  };

  render() {
    return (
      <VerticalBox className="properties-input">
        <Box alignItems="center" justifyContent="space-between" width="100%">
          <Subheader style={{ paddingLeft: 0 }}>{this.props.floatingLabelText}</Subheader>
          <FloatingActionButton
            className="button"
            mini
            onClick={this.handleAddElement}
            secondary
            zDepth={1}
          >
            <FontIcon className="material-icons">add</FontIcon>
          </FloatingActionButton>
        </Box>
        <Divider />
        {this.renderElements()}
      </VerticalBox>
    );
  }
}

export default injectIntl(Properties);
