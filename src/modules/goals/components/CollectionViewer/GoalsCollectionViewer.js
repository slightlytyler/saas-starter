import React, { PropTypes } from 'react';
import { compose, get, map } from 'lodash/fp';
import RecordViewer from '../RecordViewer';

const renderItem = id => <RecordViewer goalsId={id} key={id} />;

const renderCollection = compose(map(renderItem), get('ids'));

const GoalsCollectionViewer = ({ goalsCollection }) => (
  <ul>
    {renderCollection(goalsCollection)}
  </ul>
);

GoalsCollectionViewer.propTypes = {
  goalsCollection: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

GoalsCollectionViewer.defaultProps = {
  goalsCollection: undefined,
};

export default GoalsCollectionViewer;
