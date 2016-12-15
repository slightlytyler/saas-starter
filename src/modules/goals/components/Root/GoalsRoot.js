import React from 'react';
import CollectionFetcher from '../CollectionFetcher';
import GoalsRecordCreator from '../RecordCreator';
import CollectionViewer from '../CollectionViewer';

export const GoalsRoot = () => (
  <div>
    <GoalsRecordCreator />
    <CollectionFetcher>
      {({ goalsCollection }) => <CollectionViewer goalsCollection={goalsCollection} />}
    </CollectionFetcher>
  </div>
);

GoalsRoot.propTypes = {

};

export default GoalsRoot;
