import InputBlock from 'common/components/InputBlock';
import matchPropType from 'common/propTypes/match';
import { get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router-dom';
import { mapProps } from 'recompose';
import AddStepButton from './RoutesRecordBuilderAddStepButton';
import GeneralForm from './RoutesRecordBuilderGeneralForm';

const RoutesRecordBuilder = ({ isNewRecord, parentMatch, record }) => (
  <Box alignItems="center" column>
    <Route path={`${parentMatch.url}/general`}>
      {({ match, replace }) => (
        <InputBlock
          forceOpen={isNewRecord}
          icon="device_hub"
          onOpen={open => {
            if (!open) return replace(parentMatch.url);
            return replace(`${parentMatch.url}/general`);
          }}
          open={Boolean(match)}
          title={isNewRecord ? 'New Route' : get('body.name', record)}
        >
          {() => (
            <Box style={{ padding: '16px' }}>
              <GeneralForm onSubmit={() => {}} />
            </Box>
          )}
        </InputBlock>
      )}
    </Route>
    <Route path={`${parentMatch.url}/trigger`}>
      {({ match, replace }) => (
        <InputBlock
          disabled={isNewRecord}
          icon="flash_on"
          onOpen={open => {
            if (!open) return replace(parentMatch.url);
            return replace(`${parentMatch.url}/trigger`);
          }}
          open={Boolean(match)}
          title="Trigger"
        >
          {() => <div>Trigger</div>}
        </InputBlock>
      )}
    </Route>
    <AddStepButton disabled={isNewRecord} />
  </Box>
);

RoutesRecordBuilder.propTypes = {
  isNewRecord: PropTypes.bool.isRequired,
  parentMatch: matchPropType.isRequired,
  record: PropTypes.object,
};

RoutesRecordBuilder.defaultProps = {
  record: undefined,
};

const container = mapProps(props => ({
  isNewRecord: true,
  parentMatch: props.match,
}));

export default container(RoutesRecordBuilder);
