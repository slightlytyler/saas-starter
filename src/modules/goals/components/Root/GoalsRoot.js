import React from 'react';
import CollectionFetcher from '../CollectionFetcher';
import GoalsRecordCreator from '../RecordCreator';
import CollectionViewer from '../CollectionViewer';

export const GoalsRoot = () => (
  <div>
    <CollectionFetcher>
      {({ fetchCollection, goalsCollection }) => (
        <div>
          <GoalsRecordCreator onCreate={fetchCollection} />
          <CollectionViewer goalsCollection={goalsCollection} />
        </div>
      )}
    </CollectionFetcher>
  </div>
);

GoalsRoot.propTypes = {

};

export default GoalsRoot;
