import InputBlock from 'components/InputBlock';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { withState } from 'recompose';
import Form from '../Form';
import { createRecord } from '../../actions';

const RecordCreator = ({ expand, onSubmit, setExpand }) => (
  <Box column>
    <InputBlock
      expand={expand}
      icon="code"
      onExpand={setExpand}
      title="New Adapter"
    >
      <Form onSubmit={onSubmit} />
    </InputBlock>
  </Box>
);

RecordCreator.propTypes = {
  expand: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setExpand: PropTypes.func.isRequired,
};

export default compose(
  withActions({ onSubmit: createRecord }),
  withState('expand', 'setExpand', true),
)(RecordCreator);
