import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleFormSubmit } from 'common/dom';
import { createRecord } from 'modules/goals/actions';

export const GoalsRecordCreator = props => (
  <div>
    <header>
      <form onSubmit={handleFormSubmit(props.createRecord)}>
        <input name="text" />
        <button type="submit">Create Goal</button>
      </form>
    </header>
  </div>
);

GoalsRecordCreator.propTypes = {
  createRecord: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createRecord },
)(GoalsRecordCreator);
