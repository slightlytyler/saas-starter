import awaitModules from 'common/components/awaitModules';
import createElementFromProp from 'common/components/createElementFromProp';
import selectParamByKeyFromMatch from 'common/selectors/selectParamByKeyFromMatch';
import selectQueryFromMatch from 'common/selectors/selectQueryFromMatch';
import CodeSplitRoute from 'components/CodeSplitRoute';
import React, { PropTypes } from 'react';
import { Switch } from 'react-router';

const AdaptersRoot = ({ path }) => (
  <Switch>
    <CodeSplitRoute
      chunkName="AdaptersCollection"
      exact
      modules={{
        // eslint-disable-next-line global-require
        CollectionViewer: require('../CollectionViewer'),
      }}
      path={path}
      render={awaitModules(
        'CollectionViewer',
        createElementFromProp(
          'CollectionViewer',
          ({ match }) => ({ query: selectQueryFromMatch(match) }),
        ),
      )}
    />
    <CodeSplitRoute
      chunkName="AdaptersRecordCreator"
      modules={{
        // eslint-disable-next-line global-require
        RecordCreator: require('../RecordCreator'),
      }}
      path={`${path}/new`}
      render={awaitModules('RecordCreator', createElementFromProp('RecordCreator'))}
    />
    <CodeSplitRoute
      chunkName="AdaptersRecordEditor"
      modules={{
        // eslint-disable-next-line global-require
        RecordEditor: require('../RecordEditor'),
      }}
      path={`${path}/:adapterId`}
      render={awaitModules(
        'RecordEditor',
        createElementFromProp(
          'RecordEditor',
          ({ match }) => ({
            id: selectParamByKeyFromMatch(match, 'adapterId'),
            rootMatch: match,
          }),
        ),
      )}
    />
  </Switch>
);

AdaptersRoot.propTypes = {
  path: PropTypes.string.isRequired,
};

export default AdaptersRoot;
