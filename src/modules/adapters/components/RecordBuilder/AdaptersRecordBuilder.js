import colors from 'colors';
import matchPropType from 'common/propTypes/match';
import ActionsMenu from 'components/ActionsMenu';
import InputBlock from 'components/InputBlock';
import spinnerWhileLoading from 'containers/spinnerWhileLoading';
import withActions from 'containers/withActions';
import { compose, get, noop } from 'lodash/fp';
import { List, ListItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router';
import { mapProps } from 'recompose';
import Form from '../Form';
import * as actions from '../../actions';
import withRecord from '../../containers/withRecord';

const RecordBuilder = ({ isNewRecord, onSubmit, parentMatch, record }) => (
  <Box column>
    <Route path={`${parentMatch.url}/general`}>
      {({ history, match }) => (
        <InputBlock
          forceOpen={isNewRecord}
          icon="settings_input_component"
          onOpen={isNewRecord ? noop : open => {
            if (parentMatch.isExact) return history.push(`${parentMatch.url}/general`);
            if (!open) return history.goBack();
            return history.replace(`${parentMatch.url}/general`);
          }}
          open={Boolean(match)}
          title={isNewRecord ? 'New Adapter' : get('body.name', record)}
        >
          {() => <Form defaultValue={get('body', record)} onSubmit={onSubmit} />}
        </InputBlock>
      )}
    </Route>
    <Route path={`${parentMatch.url}/operations`}>
      {({ history, match }) => (
        <InputBlock
          disabled={isNewRecord}
          icon="layers"
          onOpen={open => {
            if (parentMatch.isExact) return history.push(`${parentMatch.url}/operations`);
            if (!open) return history.goBack();
            return history.replace(`${parentMatch.url}/operations`);
          }}
          open={Boolean(match)}
          title="Operations"
        >
          {() => (
            <Box column>
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
            </Box>
          )}
        </InputBlock>
      )}
    </Route>
  </Box>
);

RecordBuilder.propTypes = {
  isNewRecord: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  parentMatch: matchPropType.isRequired,
  record: PropTypes.object,
};

RecordBuilder.defaultProps = {
  record: undefined,
};

export default compose(
  withActions({ createRecord: actions.createRecord, updateRecord: actions.updateRecord }),
  mapProps(props => {
    const id = props.match.params.adapterId;
    const isNewRecord = id === 'new';
    return {
      ...props,
      id,
      isNewRecord,
      onSubmit: isNewRecord ? props.createRecord : props.updateRecord,
      parentMatch: props.match,
    };
  }),
  withRecord(),
  spinnerWhileLoading(props => (props.id === 'new' ? false : !get('record.body', props))),
)(RecordBuilder);
