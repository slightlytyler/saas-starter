import colors from 'colors';
import ActionsMenu from 'common/components/ActionsMenu';
import InputBlock from 'common/components/InputBlock';
import spinnerWhileLoading from 'common/containers/spinnerWhileLoading';
import withActions from 'common/containers/withActions';
import matchPropType from 'common/propTypes/match';
import { compose, get, omit } from 'lodash/fp';
import { List, ListItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router-dom';
import { mapProps } from 'recompose';
import Form from './AdaptersRecordBuilderGeneralForm';
import * as actions from '../../actions';
import withRecord from '../../containers/withRecord';

const RecordBuilder = ({ isNewRecord, onSubmit, parentMatch, record }) => (
  <Box column>
    <Route path={`${parentMatch.url}/general`}>
      {({ goBack, match, push, replace }) => (
        <InputBlock
          forceOpen={isNewRecord}
          icon="settings_input_component"
          onOpen={open => {
            if (parentMatch.isExact) return push(`${parentMatch.url}/general`);
            if (!open) return goBack();
            return replace(`${parentMatch.url}/general`);
          }}
          open={Boolean(match)}
          title={isNewRecord ? 'New Adapter' : get('body.name', record)}
        >
          {() => <Form defaultValue={get('body', record)} onSubmit={onSubmit} />}
        </InputBlock>
      )}
    </Route>
    <Route path={`${parentMatch.url}/operations`}>
      {({ goBack, match, push, replace }) => (
        <InputBlock
          disabled={isNewRecord}
          icon="layers"
          onOpen={open => {
            if (parentMatch.isExact) return push(`${parentMatch.url}/operations`);
            if (!open) return goBack();
            return replace(`${parentMatch.url}/operations`);
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

const selectId = get('match.params.adapterId');

const container = compose(
  withActions({ createRecord: actions.createRecord, updateRecord: actions.updateRecord }),
  withRecord({ fetchEvents: ['mount'], selectId }),
  mapProps(({ createRecord, updateRecord, ...props }) => {
    const isNewRecord = selectId(props) === 'new';
    const onSubmit = isNewRecord
      ? data => createRecord(
        data,
        ({ id }) => {
          props.replace(`/adapters/${id}`);
          props.push(`/adapters/${id}/operations`);
        },
      )
      : updateRecord;
    return {
      ...omit('match', props),
      isNewRecord,
      onSubmit,
      parentMatch: props.match,
    };
  }),
  spinnerWhileLoading(props => (
    props.isNewRecord ? false : get('record.loading', props) !== false
  )),
);

export default container(RecordBuilder);
