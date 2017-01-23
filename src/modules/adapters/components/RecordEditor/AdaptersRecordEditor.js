import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import InputBlock from 'components/InputBlock';
import spinnerWhileLoading from 'containers/spinnerWhileLoading';
import withActions from 'containers/withActions';
import withLocation from 'containers/withLocation';
import { compose, get } from 'lodash/fp';
import { List, ListItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router';
import { mapProps } from 'recompose';
import Form from '../Form';
import { updateRecord } from '../../actions';
import withRecord from '../../containers/withRecord';

const RecordEditor = ({ defaultValue, onSubmit, rootMatch }) => (
  <Box column>
    <Route path={`${rootMatch.url}/general`}>
      {({ history, match }) => (
        <InputBlock
          expand={Boolean(match)}
          icon="code"
          onExpand={expand => {
            if (rootMatch.isExact) return history.push(`${rootMatch.url}/general`);
            if (!expand) return history.goBack();
            return history.replace(`${rootMatch.url}/general`);
          }}
          title={defaultValue.name}
        >
          <Form defaultValue={defaultValue} onSubmit={onSubmit} />
        </InputBlock>
      )}
    </Route>
    <Route path={`${rootMatch.url}/operations`}>
      {({ history, match }) => (
        <InputBlock
          expand={Boolean(match)}
          icon="layers"
          onExpand={expand => {
            if (rootMatch.isExact) return history.push(`${rootMatch.url}/operations`);
            if (!expand) return history.goBack();
            return history.replace(`${rootMatch.url}/operations`);
          }}
          title="Operations"
        >
          <List>
            <ListItem
              primaryText="Operation 1"
              rightIconButton={
                <ActionsMenu
                  items={[
                    { action: () => {}, id: 'edit', label: 'Edit Operation' },
                    { action: () => {}, id: 'test', label: 'Test Operation' },
                    {
                      action: () => {},
                      id: 'delete',
                      label: 'Delete Operation',
                      style: { color: colors.red50 },
                    },
                  ]}
                />
              }
              secondaryText="An operation description goes here"
            />
          </List>
          <Box style={{ padding: '16px' }}>
            <RaisedButton label="New Operation" primary />
          </Box>
        </InputBlock>
      )}
    </Route>
  </Box>
);

RecordEditor.propTypes = {
  defaultValue: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rootMatch: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withRecord(),
  withLocation,
  withActions({ onSubmit: updateRecord }),
  mapProps(props => ({
    defaultValue: get('body', props.record),
    onSubmit: props.onSubmit,
    rootMatch: props.rootMatch,
  })),
  spinnerWhileLoading(props => !props.defaultValue),
)(RecordEditor);
