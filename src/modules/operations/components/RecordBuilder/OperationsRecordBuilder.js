import InputBlock from 'common/components/InputBlock';
import matchPropType from 'common/propTypes/match';
import { get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router-dom';
import { mapProps } from 'recompose';
import GeneralForm from './OperationsRecordBuilderGeneralForm';

const OperationsRecordBuilder = ({ isNewRecord, parentMatch, record }) => (
  <Box column>
    <Route path={`${parentMatch.url}/general`}>
      {({ match, replace }) => (
        <InputBlock
          forceOpen={isNewRecord}
          icon="layers"
          onOpen={open => {
            if (!open) return replace(parentMatch.url);
            return replace(`${parentMatch.url}/general`);
          }}
          open={Boolean(match)}
          title={isNewRecord ? 'New Operation' : get('body.name', record)}
        >
          {() => (
            <Box style={{ padding: '16px' }}>
              <GeneralForm onSubmit={() => {}} />
            </Box>
          )}
        </InputBlock>
      )}
    </Route>
    <Route path={`${parentMatch.url}/input`}>
      {({ match, replace }) => (
        <InputBlock
          disabled={isNewRecord}
          icon="arrow_back"
          onOpen={open => {
            if (!open) return replace(parentMatch.url);
            return replace(`${parentMatch.url}/input`);
          }}
          open={Boolean(match)}
          title="Input"
        >
          {() => <div>Input</div>}
        </InputBlock>
      )}
    </Route>
    <Route path={`${parentMatch.url}/output`}>
      {({ match, replace }) => (
        <InputBlock
          disabled={isNewRecord}
          icon="arrow_forward"
          onOpen={open => {
            if (!open) return replace(parentMatch.url);
            return replace(`${parentMatch.url}/output`);
          }}
          open={Boolean(match)}
          title="Output"
        >
          {() => <div>Input</div>}
        </InputBlock>
      )}
    </Route>
  </Box>
);

OperationsRecordBuilder.propTypes = {
  isNewRecord: PropTypes.bool.isRequired,
  parentMatch: matchPropType.isRequired,
  record: PropTypes.object,
};

OperationsRecordBuilder.defaultProps = {
  record: undefined,
};

const container = mapProps(props => ({
  isNewRecord: true,
  parentMatch: props.match,
}));

export default container(OperationsRecordBuilder);
