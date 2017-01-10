import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const GoalsRecordViewer = ({ goalsRecord }) => (
  <li>
    {goalsRecord.text}
  </li>
);

GoalsRecordViewer.propTypes = {
  goalsRecord: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
};

GoalsRecordViewer.defaultProps = {
  goalsRecord: undefined,
};

const findRecord = (state, goalsId) => state.goals.records[goalsId];

export default connect(
  (state, { goalsId }) => ({
    goalsRecord: findRecord(state, goalsId),
  }),
)(GoalsRecordViewer);
