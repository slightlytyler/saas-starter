import React, { PropTypes } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { handleFormSubmit } from 'common/dom';
import { createRecord } from 'modules/goals/actions';

const handleCreateRecord = (action, callback) => data => action(data, callback);

const handleSubmit = compose(
  handleFormSubmit,
  handleCreateRecord,
);

export const GoalsRecordCreator = props => (
  <div>
    <header>
      <form onSubmit={handleSubmit(props.createRecord, props.onCreate)}>
        <input name="text" />
        <button type="submit">Create Goal</button>
      </form>
    </header>
  </div>
);

GoalsRecordCreator.propTypes = {
  createRecord: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createRecord },
)(GoalsRecordCreator);
