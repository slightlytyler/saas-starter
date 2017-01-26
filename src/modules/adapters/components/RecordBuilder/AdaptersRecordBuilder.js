import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import InputBlock from 'components/InputBlock';
import spinnerWhileLoading from 'containers/spinnerWhileLoading';
import withActions from 'containers/withActions';
import { compose, get, noop } from 'lodash/fp';
import { List, ListItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router';
import { flattenProp, mapProps } from 'recompose';
import Form from '../Form';
import * as actions from '../../actions';
import withRecord from '../../containers/withRecord';

const RecordBuilder = ({ isExact, newRecord, onSubmit, record, url }) => (
  <Box column>
    <Route path={`${url}/general`}>
      {({ history, match }) => (
        <InputBlock
          forceOpen={newRecord}
          icon="code"
          onOpen={newRecord ? noop : expand => {
            if (isExact) return history.push(`${url}/general`);
            if (!expand) return history.goBack();
            return history.replace(`${url}/general`);
          }}
          open={Boolean(match)}
          title={newRecord ? 'New Adapter' : get('body.name', record)}
        >
          {() => <Form defaultValue={get('body', record)} onSubmit={onSubmit} />}
        </InputBlock>
      )}
    </Route>
    <Route path={`${url}/operations`}>
      {({ history, match }) => (
        <InputBlock
          disabled={newRecord}
          icon="layers"
          onOpen={expand => {
            if (isExact) return history.push(`${url}/operations`);
            if (!expand) return history.goBack();
            return history.replace(`${url}/operations`);
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
  isExact: PropTypes.bool.isRequired,
  newRecord: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  record: PropTypes.object,
  url: PropTypes.string.isRequired,
};

RecordBuilder.defaultProps = {
  record: undefined,
};

export default compose(
  withActions({ createRecord: actions.createRecord, updateRecord: actions.updateRecord }),
  flattenProp('match'),
  mapProps(props => {
    const id = props.params.adapterId;
    const newRecord = id === 'new';
    return {
      ...props,
      id: props.params.adapterId,
      newRecord,
      onSubmit: newRecord ? props.createRecord : props.updateRecord,
    };
  }),
  withRecord(),
  spinnerWhileLoading(props => (props.id === 'new' ? false : !get('record.body', props))),
)(RecordBuilder);
