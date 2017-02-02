import InputBlock from 'common/components/InputBlock';
import spinnerWhileLoading from 'common/containers/spinnerWhileLoading';
import withActions from 'common/containers/withActions';
import matchPropType from 'common/propTypes/match';
import { compose, get, omit } from 'lodash/fp';
import OperationsList from 'modules/operations/components/List';
import OperationsRecordBuilder from 'modules/operations/components/RecordBuilder';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route, Switch } from 'react-router-dom';
import { mapProps } from 'recompose';
import GeneralForm from './AdaptersRecordBuilderGeneralForm';
import * as actions from '../../actions';
import withRecord from '../../containers/withRecord';

const AdaptersRecordBuilder = ({ isNewRecord, onSubmit, parentMatch, record }) => (
  <Switch>
    <Route component={OperationsRecordBuilder} path={`${parentMatch.url}/operations/new`} />
    <Route
      render={() => (
        <Box column>
          <Route path={`${parentMatch.url}/general`}>
            {({ match, replace }) => (
              <InputBlock
                forceOpen={isNewRecord}
                icon="settings_input_component"
                onOpen={open => {
                  if (!open) return replace(parentMatch.url);
                  return replace(`${parentMatch.url}/general`);
                }}
                open={Boolean(match)}
                title={isNewRecord ? 'New Adapter' : get('body.name', record)}
              >
                {() => (
                  <Box style={{ padding: '16px' }}>
                    <GeneralForm defaultValue={get('body', record)} onSubmit={onSubmit} />
                  </Box>
                )}
              </InputBlock>
            )}
          </Route>
          <Route path={`${parentMatch.url}/operations`}>
            {({ match, push, replace }) => (
              <InputBlock
                disabled={isNewRecord}
                icon="layers"
                onOpen={open => {
                  if (!open) return replace(parentMatch.url);
                  return replace(`${parentMatch.url}/operations`);
                }}
                open={Boolean(match)}
                title="Operations"
              >
                {() => (
                  <OperationsList
                    ids={get('body.operationIds', record)}
                    onCreate={() => push(`${match.url}/new`)}
                  />
                )}
              </InputBlock>
            )}
          </Route>
        </Box>
      )}
    />
  </Switch>
);

AdaptersRecordBuilder.propTypes = {
  isNewRecord: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  parentMatch: matchPropType.isRequired,
  record: PropTypes.object,
};

AdaptersRecordBuilder.defaultProps = {
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

export default container(AdaptersRecordBuilder);
